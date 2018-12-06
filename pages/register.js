/* eslint-disable react/react-in-jsx-scope */
// import Link from 'next/link';
import Layout from '../components/MyLayout';
import InfoForm from '../components/InfoForm';

const Register = props => (
  <Layout>
    <InfoForm uuid={props.url.query.uuid} />
  </Layout>
);
// props.url.query.uuid
export default Register;
