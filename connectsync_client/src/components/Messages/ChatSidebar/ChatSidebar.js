import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setChatWorkplace } from '../../../redux/action/chat';

import './ChatSidebarStyles.css';

const ChatSidebar = ({ auth, setChatWorkplace, chat, setWorkplace }) => {
  useEffect(() => {
    auth.user && setChatWorkplace(auth.user.workplaces[0].workplace._id);
    auth.user && setWorkplace(auth.user.workplaces[0].workplace._id);
  }, [auth]);

  const clickHandler = (id) => {
    setChatWorkplace(id);
    setWorkplace(id);
  };

  return (
    <div className="h-100">
      <div className="workplace-chat">
        <h6>Workplaces</h6>
      </div>
      <div className="chat-workplace-container">
        {auth.user ? (
          auth.user.workplaces.map(
            (el, key) =>
              key == 0 && (
                <div
                  className="chat-tab"
                  key={key}
                  onClick={() => clickHandler(el.workplace._id)}
                >
                  <p>{el.workplace.name}</p>

                  {chat.id == el.workplace._id && <small>(active)</small>}
                </div>
              )
          )
        ) : (
          <div className="loading">Loading ....</div>
        )}
      </div>
    </div>
  );
};

ChatSidebar.propTypes = {
  setChatWorkplace: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, { setChatWorkplace })(ChatSidebar);
