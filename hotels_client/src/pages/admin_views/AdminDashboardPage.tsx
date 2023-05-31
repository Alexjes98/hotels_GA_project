import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Fragment>
      <h1>AdminDashboard</h1>
      <Link to={"/admin_zones"}>
        <div>Zones</div>
      </Link>
    </Fragment>
  )
}

export default AdminDashboard