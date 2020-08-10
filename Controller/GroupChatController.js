const Chat = require('../models/Chat');

const users = [];

const addUser = async ({ id, name, userId, workplace }) => {
  const existingUser = users.find(
    (user) => user.workplace === workplace && user.user.userId === userId
  );

  if (!name || !workplace)
    return { error: 'Username and workplace are required.' };
  if (existingUser) {
    users.map((el) => {
      if (el.user.userId == userId) {
        el.id = id;
      }
      return el;
    });
  }

  name = name.trim().toLowerCase();
  workplace = workplace;

  const user = { id, user: { name, userId }, workplace };

  users.push(user);

  return { userData: user };
};

const getWorkplaceMessages = async ({ workplace }) => {
  const chatStore = await Chat.find({ workplace })
    .sort({ createdAt: -1 })
    .limit(50)
    .sort({ createdAt: 1 })
    .select('user text workplace createdAt ');

  return chatStore;
};

const sendMessage = async (data) => {
  const chatStore = new Chat({
    ...data,
  });

  await chatStore.save();

  return chatStore;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInWorkplace = (workplace) =>
  users.filter((user) => user.workplace === workplace);

module.exports = {
  addUser,
  sendMessage,
  getWorkplaceMessages,
  removeUser,
  getUser,
  getUsersInWorkplace,
};
