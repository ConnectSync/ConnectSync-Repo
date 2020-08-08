import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removePopup } from '../../redux/action/popup';

import './PopupContainerStyles.css';

const PopupContainer = ({ children, removePopup, title }) => {
  return (
    <div className="modal-wrapper d-flex align-items-center justify-content-center text-dark">
      <div className="modal-backdrop"></div>
      <div className="modal-dialog w-75">
        <div className="modal-content p-5">
          <div className="border-0 p-0 position-absolute close-btn">
            <button
              type="button"
              className="close"
              onClick={() => removePopup()}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="mb-2 text-center">
            <h4>{title}</h4>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

PopupContainer.propTypes = {
  removePopup: PropTypes.func.isRequired,
};

export default connect(null, { removePopup })(PopupContainer);
