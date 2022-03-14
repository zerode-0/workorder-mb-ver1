import React from "react";
import LeftSideMenu from "./LeftSideMenu";
import HeaderNavbarCustom from './HeaderNavbarCustom'
import {  Link, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import JenMbList from "./jen/JenMbList";
import MBEntries from "./jen/MBEntries";
import Hindrance from "./jen/Hindrance";
import MBEntryHistory from "./jen/MBEntryHistory";
import JenWoCopiesSentToMe from "./jen/JenWoCopiesSentToMe";
import PrepareSchedule from './ho/workordermgmt/PrepareSchedule';
import WorkOrderMaster from './ho/workordermgmt/WorkOrderMaster';
import MstTermsCondition from './ho/workordermgmt/MstTermsCondition';
import MstCopyTo from './ho/workordermgmt/MstCopyTo';
import AddExtraaExccess from './ho/workordermgmt/AddExtraaExccess';
import WoCopiesSentMe from "./ho/workordermgmt/WoCopiesSentMe";
import ManageWoExecution from "./ho/MBManagement/ManageWoExecution";
import ModifyMBUser from "./ho/MBManagement/ModifyMbUser";
import HoHindrance from "./ho/hindranceManagement/HoHindrance";
import CreateUser from "./ho/userManagement/CreateUser";
import IncludeVendorInOffice from "./ho/options/IncludeVendorInOffice";
import UserQueries from "./ho/options/UserQueries";
import AenWoCopiesSentTome from "./aen/workOrderMgmt/AenWoCopiesSentTome";
import AenMBEntry from "./aen/MBManagement/AenMBEntry";
import Aenhindrance from "./aen/hindrance/Aenhindrance";
export default function Dashboard() {
  let navigate=useNavigate();
  const logOut=async(event)=>{
    event.preventDefault();
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("FullName");
    localStorage.removeItem("LoginName");
    localStorage.removeItem("RoleId");
    localStorage.removeItem("RoleType");
    navigate('/');
  }
  return (
    localStorage.getItem("Token")!=null?
    <div>
      <LeftSideMenu />
      <div className="content-page">
        <div className="content">
          <HeaderNavbarCustom logOut={logOut}/>
          <Routes>
          <Route  path="profile" element={<Profile />} /> 
          <Route  path="changePassword" element={<ChangePassword />} />
          </Routes>
          {localStorage.getItem('RoleType')==='JEN'?
          <Routes>
          <Route  path="mblist" element={<JenMbList />} /> 
          <Route  path="mbEntries" element={<MBEntries />} /> 
          <Route path="hindrance" element={<Hindrance />}/>
          <Route path="/mbEntries/MbEntriesHistory" element={<MBEntryHistory />}/>
          <Route path="/workOrderManagement/WoCopiesSentToMe" element={<JenWoCopiesSentToMe />}/>
          </Routes>
          :
          localStorage.getItem('RoleType')==='HO'?
          <Routes>
            <Route path="prepareScheduleGH" element={<PrepareSchedule />} />
            <Route path="/workOrderManagement/workOderMaster" element={<WorkOrderMaster />} />
            <Route path="/workOrderManagement/mstTermsCondition" element={<MstTermsCondition />} />
            <Route path="/workOrderManagement/mstCopyTo" element={<MstCopyTo />} />
            <Route path="/workOrderManagement/AddExtraExccess" element={<AddExtraaExccess />} />
            <Route path="/workOrderManagement/WoCopiesSentMe" element={<WoCopiesSentMe />}/>
            
            <Route path="ManageWoExecution" element={<ManageWoExecution />}/>
            <Route path="ModifyMBUser" element={<ModifyMBUser />}/>

            <Route path="hindrance" element={<HoHindrance/>}/>

            <Route path="createUser" element={<CreateUser />}/>

            <Route path="includeVendorInOffice" element={<IncludeVendorInOffice/>}/>
            <Route path="UserQueries" element={<UserQueries/>}/>
          </Routes>
          :
          localStorage.getItem('RoleType')==='AEN'?
          <Routes>
            <Route path="workOrderManagement/WoCopiesSentToMe" element={<AenWoCopiesSentTome />} />
            <Route path="mbManagement/mbEntry" element={<AenMBEntry />} />
            <Route path="hindrance/Aenhindrance" element={<Aenhindrance />} />
          </Routes>
          :
          null
        }

          <Outlet />
        </div>
      </div>
    </div>
    :<Navigate to='/'/>
  );
}
