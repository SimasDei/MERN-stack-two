import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get First Name
    const firstName = profile.user.name.trim().split(' ')[0];
    // Map through skill array
    const skills = profile.skills.map((skill, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3>{firstName}'s bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>No Bio created</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Acquired Skills</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
