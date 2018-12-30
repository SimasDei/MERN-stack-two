import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link className="btn btn-light" to="/edit-profile">
        <i className="fas fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>

      <Link className="btn btn-light" to="/add-experience">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>

      <Link className="btn btn-light" to="/add-education">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
