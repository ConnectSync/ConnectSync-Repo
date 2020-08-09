import React from "react"
import "./ProfileStlyes.scss"

const Profile = (props) => {
    return(
        <div className="profile all-center flex-column">
            <div className="profileImageDiv mt-5 mb-4">
                <img src="..." className="profileImg" />
            </div>
            <h5>jawad</h5>
            <small>jawad@gmail.com</small>
            <small>SDE at Google</small>
            <p className="lead border-top w-100 text-center m-0 py-3">Active Workplaces <i className="fa fa-pencil"></i></p>
            <small className="mb-1">Select your active workplaces:</small>
        </div>
    )
}

export default Profile