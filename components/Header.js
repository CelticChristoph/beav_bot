/* eslint-disable react/react-in-jsx-scope */
// import Link from 'next/link';

// const headerStyle = {
// };

const Header = () => (
  // Header bar goes here.
  <div>
    <h1 className="title">OSU EECS Discord Server</h1>
    <style jsx>
      {`
        .title {
          font: "Open+Sans",sans-serif;
          background: #000;
          color: #fff;
          padding: 20px;
          text-align: center;
          margin: 0px;
          margin-bottom: 20px;
        }
        `}
    </style>
  </div>
);

export default Header;
