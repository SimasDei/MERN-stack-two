import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    // Get user from the Auth State
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if the current user has a Profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Hello, dear sir and Or mam.{' '}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />

            {/* Pass profile experience object */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: '60px' }}>
              <button className="btn btn-danger" onClick={this.onDeleteClick}>
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        // Suggest to create a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">New Profile Time!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div style={{ height: '100vh' }} className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashbordio</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
