import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // Map through experience and Education
    const expItems = experience.map(exp => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
          {' - '}
          {exp.to === null ? (
            ' Present'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: {exp.title}</strong>
        </p>
        <p>
          {exp.location === '' ? null : (
            <strong>Based in: {exp.location}</strong>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <strong>Details: {exp.description}</strong>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment>
          {' - '}
          {edu.to === null ? (
            ' Present'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          {edu.degree === '' ? null : <strong>Degree: {edu.degree}</strong>}
        </p>
        <p>
          {edu.fieldOfStudy === '' ? null : (
            <strong>Field Of Study: {edu.fieldOfStudy}</strong>
          )}
        </p>
        <p>
          {edu.description === '' ? null : (
            <strong>Details: {edu.description}</strong>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <div className="list-group">{expItems}</div>
          ) : (
            <p className="text-center">Experience not provided</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <div className="list-group">{eduItems}</div>
          ) : (
            <p className="text-center">Education not provided</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
