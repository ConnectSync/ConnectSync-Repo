import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './Messages.scss';

import Navbar from '../../components/Navbar';
import ChatSidebar from '../../components/Messages/ChatSidebar';
import MessagesComponent from '../../components/Messages';

const Messages = ({ user }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [workplace, setWorkplace] = useState('');

  useEffect(() => {
    setCurrentUser({
      userId: user._id,
      name: user.name,
    });
  }, [user]);

  return (
    <div className="public">
      <Navbar />
      <div className="container-fluid messages-view">
        <div className="row">
          <div className="col-md-1 col-lg-3 p-0">
            <ChatSidebar setWorkplace={(id) => setWorkplace(id)} />
          </div>
          <div className="col-md-10 col-lg-9 p-0">
            {currentUser.name && workplace && (
              <MessagesComponent
                currentUser={currentUser}
                workplace={workplace}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Messages);
