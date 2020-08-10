import React, { useState, useEffect } from 'react';

import './ChatFormStyles.css';

const ChatForm = ({ formSubmitHandler, setMessage, message }) => {
  useEffect(() => {}, [message]);
  return (
    <div className="chat-form">
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <input
          type="text"
          placeholder="Type something here..."
          name="message"
          id="message"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          data-chat="input"
        />

        <button type="submit" tabIndex="0">
          <img src="/static/images/icons/send.svg" />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
