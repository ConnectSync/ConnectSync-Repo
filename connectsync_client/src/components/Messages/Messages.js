import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import queryString from 'querystring';

import ChatBox from './ChatBox';
import ChatForm from './ChatForm';

import './MessagesStyles.css';

let socket;

const Messages = ({ currentUser, workplace }) => {
  const [userData, setUserData] = useState({
    name: '',
    userId: '',
    workplace: '',
  });
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    setUserData({
      ...userData,
      name: currentUser.name,
      userId: currentUser.userId,
      workplace,
    });

    socket = io(ENDPOINT);

    socket.emit(
      'join',
      {
        name: currentUser.name,
        userId: currentUser.userId,
        workplace: workplace,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }, [ENDPOINT, workplace, currentUser]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('workplaceData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    socket.on('allMessages', (message) => {
      setMessages([...message]);
    });

    socket.on('workplaceData', ({ users }) => {
      setUsers(users);
    });
  }, [workplace]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', { message, createdAt: new Date() }, () =>
        setMessage('')
      );
    }
    document.querySelector('[data-chat="input"]').focus();
  };

  return (
    <div className="chat-box-container">
      {/* <div className="workplace-details">
        <h6>{workplace}</h6>
      </div> */}
      <ChatBox messages={messages} userId={userData.userId} />
      <ChatForm
        formSubmitHandler={formSubmitHandler}
        setMessage={(data) => setMessage(data)}
        message={message}
      />
    </div>
  );
};

export default Messages;
