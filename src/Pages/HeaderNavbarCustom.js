import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function HeaderNavbarCustom(props) {
  let navigate=useNavigate();
  return (
    <div className="navbar-custom">
      <ul className="list-unstyled topbar-menu float-end mb-0"> 
        <li className="dropdown notification-list">
          <button
            className="nav-link dropdown-toggle nav-user arrow-none me-0"
            data-bs-toggle="dropdown"
            href="#"
            
            aria-haspopup="false"
            aria-expanded="false"
          >
            <span className="account-user-avatar">
              <img
                src="assets/images/users/avatar-1.jpg"
                alt="user"
                className="rounded-circle"
              />
            </span>
            <span>
              <span className="account-user-name">{localStorage.getItem("LoginName")}</span>
              <span className="account-position">user</span>
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
            <div className=" dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div>              
              <Link to='profile' className="dropdown-item notify-item"> <i className="mdi mdi-account-circle me-1"></i> <span>Profile</span></Link>
            
            <Link to='changePassword' className="dropdown-item notify-item"> 
              <i className="mdi mdi-lock-outline me-1"></i>
              <span>Change Password</span>
            </Link>

            <button onClick={(e)=>{props.logOut(e)}} className="dropdown-item notify-item">
              <i className="mdi mdi-logout me-1"></i>
              <span>Logout</span>
            </button>
          </div>
        </li>
      </ul>
      <button className="button-menu-mobile open-left">
        <i className="mdi mdi-menu"></i>
      </button>
    </div>
  );
}
