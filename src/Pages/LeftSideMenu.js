import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LeftSideMenu() {
  return localStorage.getItem('RoleType')=='JEN'?
  (<Jen/>)
  :
  localStorage.getItem('RoleType')=='HO'?
  <Ho />
  :
  localStorage.getItem('RoleType')=='AEN'?
  <Aen/>
  :
  null
}
const Jen=()=>{
  let navigate=useNavigate();
  return(
    <div className="leftside-menu" style={{transition:'0.2s'}}>
     <ul className="side-nav logo logo-light">
        <li className="side-nav-item" style={{paddingLeft:'3px'}}>
        <span style={{color:'#8391a2',fontWeight:'Bold',textTransform:'uppercase'}}>
      <span className="logo-lg">
      WorkOrder MB Module
      </span>
    </span> 
        </li>
    </ul>
    <div className="h-100" id="leftside-menu-container" data-simplebar>
      <ul className="side-nav">

        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarDashboards"
            aria-expanded="false"
            aria-controls="sidebarDashboards"
            className="side-nav-link"
          >
          </a>
        </li>
        <li className="side-nav-item">
        <button className="btn side-nav-link" onClick={(e)=>{navigate(-1)}} style={{padding:0,margin:'2px'}}>
    <i className="mdi dripicons-arrow-thin-left lg"></i> <span> Back</span>
    </button>
        </li>
        <li className="side-nav-item border-bottom">
        
            <Link to='/Dashboard' className="font-16 side-nav-link" style={{padding:0}} onClick={(e)=>navigate('/Dashboard')}><i className="uil-home-alt"></i><span> Dashboard</span>
            </Link> 
        </li>
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#workOrderManagement"
            aria-expanded="false"
            aria-controls="workOrderManagement"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> WorkOrder Management </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="workOrderManagement">
              <ul className="side-nav-second-level">
              <li>
                <Link to='workOrderManagement/WoCopiesSentToMe'>WO Copies sent to me</Link>
              </li>
              </ul>
          </div>
        </li> 
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#MesurementBook"
            aria-expanded="false"
            aria-controls="MesurementBook"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> Mesurement Book </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="MesurementBook">
            <ul className="side-nav-second-level">
              <li>
                <Link to='mblist'>MB Record List</Link>
              </li> 
            </ul>
          </div>
        </li>  
       
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#Hindrance"
            aria-expanded="false"
            aria-controls="Hindrance"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span>{localStorage.getItem('RoleType')==='JEN'?'Hindrance':null}</span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="Hindrance">
            <ul className="side-nav-second-level">
              <li>
                <Link to='hindrance'>Hindrances</Link>
              </li> 
            </ul>
          </div>
        </li> 
        <li className="side-nav-item">
        
          <a
            data-bs-toggle="collapse"
            href="#sidebarBaseUI"
            aria-expanded="false"
            aria-controls="sidebarBaseUI"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> Base UI </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="sidebarBaseUI">
            <ul className="side-nav-second-level">
              <li>
                <a href="ui-accordions.html">Accordions</a>
              </li> 
            </ul>
          </div>
        </li> 
      </ul>
      <div className="clearfix"></div>
    </div>
  </div>
  )
}
const Ho=()=>{
  let navigate=useNavigate();
  return(
    <div className="leftside-menu">
    <ul className="side-nav logo logo-light">
        <li className="side-nav-item" style={{paddingLeft:'3px'}}>
        <Link to='/Dashboard' style={{color:'#8391a2',fontWeight:'Bold',textTransform:'uppercase'}}>
      <span className="logo-lg">
      WorkOrder MB Module
      </span>
    </Link>
        </li>
    </ul>
    <div className="h-100" id="leftside-menu-container" data-simplebar>
      <ul className="side-nav">
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarDashboards"
            aria-expanded="false"
            aria-controls="sidebarDashboards"
            className="side-nav-link"
          >
          </a>
        </li>
        <li>
        <button className="btn btn-link" onClick={(e)=>{navigate(-1)}} style={{padding:0,margin:'2px'}}>
    <i className="mdi dripicons-arrow-thin-left lg"></i> Back
    </button>
        </li>
        <li className="side-nav-item table-light border-bottom">
            <h4 className="side-nav-title side-nav-item font-16" style={{padding:0}} onClick={(e)=>navigate('/Dashboard')}><i className="uil-home-alt"></i> Dashboard
            </h4>
        </li>

        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#workOrderManagement"
            aria-expanded="false"
            aria-controls="workOrderManagement"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> WorkOrder Management </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="workOrderManagement">
            
              {localStorage.getItem('RoleType')==='HO'?
              <ul className="side-nav-second-level">
              <li>
               <Link to='prepareScheduleGH'>Prepare Schedule G/H</Link>
              </li>
              <li>
                <Link to='workOrderManagement/workOderMaster'>WorkOrder Master</Link>
              </li>
              <li>
               <Link to='workOrderManagement/mstTermsCondition'>mstTermsCondition</Link>
              </li>
              <li>
              <Link to="workOrderManagement/mstCopyTo">mstCopyTo</Link>
              </li>
              <li>
          <Link to="workOrderManagement/AddExtraExccess">AddExtraExccess</Link>
          </li>
          <li>
          <Link to="workOrderManagement/WoCopiesSentMe">WoCopiesSentMe</Link>
          </li>
            </ul>
              :
              <ul className="side-nav-second-level">
              <li>
                <a href="ui-accordions.html">WO Copies sent to me</a>
              </li>
              </ul>
              }                
          </div>
        </li> 
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#MesurementBook"
            aria-expanded="false"
            aria-controls="MesurementBook"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> Mesurement Book </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="MesurementBook">
            
            <ul className="side-nav-second-level">
              <li>
                <Link to='ManageWoExecution'>ManageWoExecution</Link>
              </li> 
              <li>
                <Link to='ModifyMBUser'>ModifyMBUser</Link>
              </li> 
            </ul>

          </div>
        </li>  
       
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#Hindrance"
            aria-expanded="false"
            aria-controls="Hindrance"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span>{localStorage.getItem('RoleType')==='HO'?'Hindrance Management':null}</span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="Hindrance">
            <ul className="side-nav-second-level">
              <li>
                <Link to='hindrance'>Hindrances</Link>
              </li> 
            </ul>
          </div>
        </li> 
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarBaseUI"
            aria-expanded="false"
            aria-controls="sidebarBaseUI"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> User Management </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="sidebarBaseUI">
            <ul className="side-nav-second-level">
              <li>
                <Link to='createUser'>Create User</Link>
              </li> 
            </ul>
          </div>
        </li> 
        <li className="side-nav-item">
        <a
            data-bs-toggle="collapse"
            href="#sidebarBaseUI"
            aria-expanded="false"
            aria-controls="sidebarBaseUI"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> Options </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="sidebarBaseUI">
            <ul className="side-nav-second-level">
              <li>
                <Link to='includeVendorInOffice'>Include Vendor In Office</Link>
              </li> 
              <li>
                <Link to='UserQueries'>User Queries</Link>
              </li> 
            </ul>
          </div>
        </li>        
      </ul>
      <div className="clearfix"></div>
    </div>
  </div>
  )
}
const Aen=()=>{
  let navigate=useNavigate();
  return(
    <div className="leftside-menu">
    <ul className="side-nav logo logo-light">
        <li className="side-nav-item" style={{paddingLeft:'3px'}}>
        <Link to='/Dashboard' style={{color:'#8391a2',fontWeight:'Bold',textTransform:'uppercase'}}>
      <span className="logo-lg">
      WorkOrder MB Module
      </span>
    </Link>
        </li>
    </ul>
    <div className="h-100" id="leftside-menu-container" data-simplebar>
      <ul className="side-nav">
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarDashboards"
            aria-expanded="false"
            aria-controls="sidebarDashboards"
            className="side-nav-link"
          >
          </a>
        </li>
        <li>
        <button className="btn btn-link" onClick={(e)=>{navigate(-1)}} style={{padding:0,margin:'2px'}}>
    <i className="mdi dripicons-arrow-thin-left lg"></i> Back
    </button>
        </li>
        <li className="side-nav-item table-light border-bottom">
            <h4 className="side-nav-title side-nav-item font-16" style={{padding:0}} onClick={(e)=>navigate('/Dashboard')}><i className="uil-home-alt"></i> Dashboard
            </h4>
        </li>
        
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#workOrderManagement"
            aria-expanded="false"
            aria-controls="workOrderManagement"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> WorkOrder Management </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="workOrderManagement">
              <ul className="side-nav-second-level">
              <li>
                <Link to='workOrderManagement/WoCopiesSentToMe'>WO Copies sent to me</Link>
              </li>
              </ul>
          </div>
        </li> 
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#MesurementBook"
            aria-expanded="false"
            aria-controls="MesurementBook"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span> MB Management </span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="MesurementBook">
            <ul className="side-nav-second-level">
              <li>
                <Link to='mbManagement/mbEntry'>MB Entry</Link>
              </li> 
            </ul>
          </div>
        </li>  
       
        <li className="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#Hindrance"
            aria-expanded="false"
            aria-controls="Hindrance"
            className="side-nav-link"
          >
           <i className="uil-folder-plus"></i>
            <span>{localStorage.getItem('RoleType')==='AEN'?'Hindrance':null}</span>
            <span className="menu-arrow"></span>
          </a>
          <div className="collapse" id="Hindrance">
            <ul className="side-nav-second-level">
              <li>
                <Link to='hindrance/Aenhindrance'>Hindrances</Link>
              </li> 
            </ul>
          </div>
        </li> 

      </ul>
      <div className="clearfix"></div>
    </div>
  </div>
  )
}