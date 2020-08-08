import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PopupContainer from './PopupContainer';
import { openChangePopup } from '../../redux/action/popup';


const AuthPop = (props) => {
    const {openChangePopup,data} = props

    return (
        <PopupContainer>
            <h4>popup</h4>
        </PopupContainer>
    )
}
AuthPop.propTypes = {
 openChangePopup: PropTypes.func.isRequired,    
  };

  export default connect({openChangePopup})(AuthPop)