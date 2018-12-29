import React, { Component } from 'react';
import PropTypes from 'prop-types';
// withRouter needed to be able to redirect in Actions
import { withRouter } from 'react-router-dom';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount() {
    // Check to see if the user is logged in
    if (this.props.auth.isAuthenticated) {
      // Redirect from the Register page
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check if there are any errors in the REDUX state
    // If true, combine with the component error state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Pass in the history property for redirecting
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    // Pull errors out of the state
    const { errors } = this.state;
    return (
      <div style={{ height: '100vh' }}>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create An Account !</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="You can use Gravatar on this Site"
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map react Component properties to prop-types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
