import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  state = {
    content: ''
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        content: (
          <div>
            <Link to="/dashboard" className="btn btn-lg btn-info mr-2">
              Go To Dashboard
            </Link>
          </div>
        )
      });
    } else {
      this.setState({
        content: (
          <div>
            <Link to="/register" className="btn btn-lg btn-info mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-lg btn-light">
              Login
            </Link>
          </div>
        )
      });
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">MERN Stack</h1>
                <p className="lead">
                  Application Made using MongoDB + Express + React + Node
                </p>
                <hr />
                {this.state.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
