import React, { Component, PropTypes } from 'react';
import './Profile.css';

export default class Profile extends Component {
  render(props) {
    return(
      <div className={this.props.active ? "profile-container active" : "profile-container"}>
        <div className={"info-container"}>
          <div className={"profile-img"}>
            <img className={"profile"} src={require("../../../assets/bio.png")} />
          </div>
          <div className="user-info">
            <p className="name"><span className="first">Cory</span><span className="last">&nbsp;Dickson</span></p>
            <p className="company">piBrain Inc.</p>
            <p className="membership">Member Since: Jan 2017</p>
            <div className="icon-tray">
              <span className="edit"><img className={"edit-icon"} src={require("../../../assets/edit.svg")} />Edit Profile</span>
              <span className="picture"><img className={"change-icon"} src={require("../../../assets/camera.svg")} />Change Picture</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
