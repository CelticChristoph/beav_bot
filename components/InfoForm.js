/* eslint-disable react/react-in-jsx-scope */
function submitForm(props) {
  console.log(`UUID: ${props.uuid}`);
}

const InfoForm = props => (
  <div className="container">
    <h3 className="title">Registration Webform</h3>
    <div>
      <form className="infoForm" id="infoForm" method="post" action="/register">
        <div id="fname">
          {' '}
          <span>First Name</span>
          <input type="text" name="firstName" id="textFirst" placeholder="Firstname" required />
        </div>
        <div id="lname">
          {' '}
          <span>Last Name</span>
          <input type="text" name="lastName" id="textLast" placeholder="Lastname" required />
        </div>
        <div id="onid">
          {' '}
          <span>ONID</span>
          <input type="text" name="onid" id="textOnid" placeholder="lastnamef" required />
        </div>
        <div id="field">
          {' '}
          <span>Field</span>
          <select name="field">
            <option value="" disabled hidden required />
            <option value="1">Electrical Engineering</option>
            <option value="2">Computer Science</option>
          </select>
        </div>
        <div id="status">
          {' '}
          <span>Status</span>
          <select name="status">
            <option value="" disabled hidden required />
            <option value="1">Undergraduate</option>
            <option value="2">Graduate/PhD</option>
            <option value="3">Alumini</option>
          </select>
        </div>
        <div id="buttons">
          <input type="submit" id="submitForm" value="Submit" onClick={submitForm(props, this)} />
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

export default InfoForm;
