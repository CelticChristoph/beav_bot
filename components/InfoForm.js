/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import PropTypes from 'prop-types';

class InfoForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      onid: '',
      field: '',
      status: '',
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    const { uuid } = this.props;
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { onid } = this.state;
    const { field } = this.state;
    const { status } = this.state;
    console.log(`UUID: ${uuid}`);
    console.log(`First: ${firstName}`);
    console.log(`Last: ${lastName}`);
    console.log(`ONID: ${onid}`);
    console.log(`Field: ${field}`);
    console.log(`Year: ${status}`);

    event.preventDefault();
  }

  render() {
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { onid } = this.state;
    const { field } = this.state;
    const { status } = this.state;

    return (
      <div className="container">
        <h3 className="title">Registration Webform</h3>
        <div>
          <form className="infoForm" id="infoForm" onSubmit={this.handleSubmit}>
            <div id="fname">
              {' '}
              <span>First Name</span>
              <input type="text" name="firstName" id="textFirst" placeholder="Firstname" required value={firstName} onChange={this.handleChange} />
            </div>
            <div id="lname">
              {' '}
              <span>Last Name</span>
              <input type="text" name="lastName" id="textLast" placeholder="Lastname" required value={lastName} onChange={this.handleChange} />
            </div>
            <div id="onid">
              {' '}
              <span>ONID</span>
              <input type="text" name="onid" id="textOnid" placeholder="lastnamef" required value={onid} onChange={this.handleChange} />
            </div>
            <div id="field">
              {' '}
              <span>Field</span>
              <select name="field" value={field} onChange={this.handleChange}>
                <option value="" disabled hidden required />
                <option value="ee">Electrical Engineering</option>
                <option value="cs">Computer Science</option>
              </select>
            </div>
            <div id="status">
              {' '}
              <span>Status</span>
              <select name="status" value={status} onChange={this.handleChange}>
                <option value="" disabled hidden required />
                <option value="ug">Undergraduate</option>
                <option value="gdphd">Graduate/PhD</option>
                <option value="alum">Alumini</option>
              </select>
            </div>
            <div id="buttons">
              <input type="submit" id="submitForm" value="Submit" />
              <input type="reset" id="resetForm" value="Reset" />
            </div>
          </form>
        </div>
        <style jsx>
          {`
            body {
              margin: 0;
              padding: 0;
            }
            
            .container {
              padding: 10px;
              background-color: rgba(209, 209, 209, 0.58);
              margin: auto;
              margin-top: 0px;
              
              width: 70%;
              height: auto;
              max-width: 600px
            }
            
            .title {
              text-align: center;
              text-decoration: underline;
              margin: 18px 0px;
            }
            
            .container span {
              margin-top: 10px;
              padding-left: 40px;
              padding-right: 10px;
              display: inline-block;
              width: 20%;
              text-align: right;
            }
            
            .container select {
              min-height: 25px;
              display: inline-block;
              width: 50.5%;
              background: #2b2c2b;
              color: #fff;
              border: none;
              border-radius: 5px;
              padding: 3px 0px;
              text-indent: 2px;
            }
            
            .container input {
              min-height: 25px;
              display: inline-block;
              width: 50%;
              background: #2b2c2b;
              color: #fff;
              border: none;
              border-radius: 5px;
            }
            
            .container form {
              margin-bottom: 18px;
            }
            
            #textFirst, #textLast, #textOnid {
              text-indent: 7px;
            }
            
            #buttons {
              margin-top: 10px;
            }
            
            #submitForm,
            #resetForm {
              display: inline-block;
              width: 15%;
              margin-top: 10px;
              margin-left: 30%;
            }
            
            #resetForm {
              margin-left: 10%;
            }
            `}
        </style>
      </div>
    );
  }
}

InfoForm.propTypes = {
  uuid: PropTypes.string.isRequired,
};

export default InfoForm;
