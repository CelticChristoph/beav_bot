/* eslint-disable react/react-in-jsx-scope */
// import Link from 'next/link';
import { withRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/MyLayout';
import InfoForm from '../components/InfoForm';

class Register extends React.PureComponent {
  render() {
    const { router } = this.props;
    // console.log(router.query.uuid);
    return (
      <Layout>
        <InfoForm uuid={router.query.uuid} />
      </Layout>
    );
  }
}

Register.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Register);
