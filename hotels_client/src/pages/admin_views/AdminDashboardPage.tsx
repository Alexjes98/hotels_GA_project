import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Fragment>
      <h1>AdminDashboard</h1>
      <Link to={"/admin_zones"}>
        <div>
          <h2>Admin Zones</h2>
        </div>
      </Link>
      <Link to={"/admin_hotels"}>
        <div>
          <h2>Admin Hotels</h2>
        </div>
      </Link>
      
    </Fragment>
  )
}

export default AdminDashboard