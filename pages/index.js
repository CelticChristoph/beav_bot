/* eslint-disable react/react-in-jsx-scope */
// import Link from 'next/link';
import Layout from '../components/MyLayout';

const Index = () => (
  <Layout>
    <div className="container">
      <h3 className="title">Registration Webform</h3>
      <form>
        <div id="fname">
          {' '}
          <span>First Name</span>
          <input type="text" id="textFirst" placeholder="Firstname" required />
        </div>
        <div id="lname">
          {' '}
          <span>Last Name</span>
          <input type="text" id="textLast" placeholder="Lastname" required />
        </div>
        <div id="onid">
          {' '}
          <span>ONID</span>
          <input type="text" id="textOnid" placeholder="lastnamef" required />
        </div>
        <div id="field">
          {' '}
          <span>Field</span>
          <select>
            <option value="" disabled selected hidden required />
            <option value="1">Electrical Engineering</option>
            <option value="2">Computer Science</option>
          </select>
        </div>
        <div id="status">
          {' '}
          <span>Status</span>
          <select>
            <option value="" disabled selected hidden required />
            <option value="1">Undergraduate</option>
            <option value="2">Graduate/PhD</option>
            <option value="3">Alumini</option>
          </select>
        </div>
        <div id="buttons">
          <input type="button" id="submit" value="Submit" />
          <input type="button" id="reset" value="Reset" />
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
          height: 90%;
          max-width: 600px
        }
        
        .title {
          text-align: center;
          text-decoration: underline;
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
        
        #textFirst, #textLast, #textOnid {
          text-indent: 7px;
        }

        #buttons {
          margin-top: 10px;
        }

        #submit,
        #reset {
          display: inline-block;
          width: 15%;
          margin-top: 10px;
          margin-left: 30%;
        }
        
        #reset {
          margin-left: 10%;
        }
    `}
    </style>
  </Layout>
);

// Index.getInitialProps = async function () {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
//   const data = await res.json();

//   console.log(`Show data fetched. Count: ${data.length}`);

//   return {
//     shows: data,
//   };
// };

export default Index;
