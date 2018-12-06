/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import Header from './Header';

// const layoutStyle = {

// };

const Layout = ({ children }) => (
  <div id="siteContainer">
    <Header />
    {children}
    <style jsx>
      {`
        margin: 20px;
        padding: 20px;
        border: 1px solid #DDD;
        background: #d73f09;
        height: 91vh;
      `}
    </style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
