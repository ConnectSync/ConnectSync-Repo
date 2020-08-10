import React, { useEffect } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';

import './ChatBoxStyles.css';

const ChatBox = ({ messages, userId }) => {
  useEffect(() => {}, [messages, userId]);
  return (
    <div>
      <ScrollToBottom className="user-message-container">
        {messages &&
          messages.map((message, key) =>
            message.notification ? (
              <div className="user-notification" key={key}>
                {message.text}
              </div>
            ) : (
              <div
                className={`user-message ${
                  message.user.userId == userId ? 'sender' : ''
                }`}
                key={key}
              >
                <div className="img-container">
                  <img
                    src="https://www.w3schools.com/w3images/avatar6.png"
                    alt=""
                  />
                </div>
                <div className="message">
                  <span className="username">{message.user.name}</span>
                  <p>{message.text}</p>
                  <span className="time">
                    {moment(message.createdAt).format('hh:mm A')}
                  </span>
                </div>
              </div>
            )
          )}
      </ScrollToBottom>
    </div>
  );
};

export default ChatBox;
