const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const router = require('./router');

const {
  addUser,
  sendMessage,
  removeUser,
  getUser,
  getUsersInWorkplace,
  getWorkplaceMessages,
} = require('./Controller/GroupChatController');

// db config
const db = process.env.mongoURI;

//connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); //exit process
  }
};
connectDB();

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting up cors, headers

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  next();
};

app.use(allowCrossDomain);

app.use(router);

// Socket.io
const server = http.Server(app);
const io = socket(server);

io.on('connect', (socket) => {
  socket.on('join', async ({ userId, name, workplace }, callback) => {
    const { error, userData } = await addUser({
      id: socket.id,
      name,
      userId,
      workplace,
    });

    if (error) return callback(error);

    socket.join(userData.workplace);

    const chatStore = await getWorkplaceMessages({ workplace });

    socket.emit('allMessages', chatStore);

    socket.broadcast.to(userData.workplace).emit('message', {
      user: 'admin',
      text: `${userData.user.name} has joined!`,
      notification: true,
    });

    io.to(userData.workplace).emit('workplaceData', {
      workplace: userData.workplace,
      users: await getUsersInWorkplace(userData.workplace),
    });

    callback();
  });

  socket.on('sendMessage', async (messageData, callback) => {
    const userData = getUser(socket.id);
    console.log(socket.id);

    const data = {
      user: { name: userData.user.name, userId: userData.user.userId },
      workplace: userData.workplace,
      text: messageData.message,
    };

    await sendMessage(data);

    io.to(userData.workplace).emit('message', data);

    callback();
  });

  socket.on('disconnect', async () => {
    const userData = await removeUser(socket.id);

    if (userData) {
      io.to(userData.workplace).emit('message', {
        user: 'Admin',
        text: `${userData.user.name} has left.`,
        notification: true,
      });

      io.to(userData.workplace).emit('workplaceData', {
        workplace: userData.workplace,
        users: getUsersInWorkplace(userData.workplace),
      });
    }
  });
});

// port
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
