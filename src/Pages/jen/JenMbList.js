import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function JenMbList() {
  let navigate=useNavigate();
  const [mbList, setMbList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workOrderId, setWorkOrderId] = useState(0);
  const[workOrder,setWorkOrder]=useState({});
  const [vendor, setVendor] = useState({});
  const[daviation,setDaviation]=useState([]);
  useEffect(() => {
    fetch("/api/wolist", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('Token')
      }
    }).then((result) => {
      if (result.ok === true) {
        if (result.status === 200) {
          result.json().then((res) => {
            console.log('list: ', res);
            
            setMbList(res.data);
            
            /* localStorage.setItem("Token", res.data.Token);
             localStorage.setItem("UserId", res.data.UserId);
             localStorage.setItem("FullName", res.data.FullName);
             localStorage.setItem("LoginName", res.data.LoginName);
             localStorage.setItem("RoleId", res.data.RoleId);
             localStorage.setItem("RoleType", res.data.RoleType);
             navigate("/Dashboard");
             window.location.reload();*/
          });
        }
      }
    });

    setLoading(false);
  }, []);
  const generateDaviation=async(WOId)=>{
    console.log('',WOId);
const statement=await getDaviationStatment(WOId);
console.log('statment',statement);
setDaviation(statement);
  }
  return (loading ?
    <div class="row justify-content-center">
      <div class="col-md-5 mb-6">
        <div class="spinner-border avatar-lg" role="status"></div>
      </div>

    </div>
    :
    <div>
      <div class="tab-content">
        <div className="card" id="multi-item-preview">
          <div className='card-body'>

            <h4 class="header-title mb-3">Record List</h4>

            <div class="table-responsive">

              <table class="table mb-0">


                <tbody>
                  {
                    mbList.map((data, index) => {
                      return <tr className='producst-datatable_wrapper' key={index} >
                        <td>{index + 1}.</td>
                        <td className='col-lg-2 '>

                          <p class="mb-0">
                            <button class="btn btn-link text-success me-2" style={{padding:0}} data-bs-toggle="modal" onClick={(e) => /*setWorkOrderId(data.WOId)*/setWorkOrder(data)} data-bs-target="#standard-modal">{data.WOName}</button>

                            <h6 class="text-uppercase mt-0">WO Id</h6>
                            <h2 class="my-2" id="active-users-count">{data.WOId}</h2>

                            <span className='text-nowrap'> <i class="mdi mdi-calendar-range font-13"></i>{data.WODate}
                            </span>
                          </p>
                        </td>
                        <td className='col-lg-2'><ul className='bul'><li>Work Order No. <b>{data.WONo}</b></li><li><i class="mdi mdi-square text-danger"></i>Nodal office {data.ExecutionOfficeCode}</li><li><i class="mdi mdi-square text-primary"></i><button class="btn btn-link text-danger m2" style={{padding:0}} data-bs-toggle="modal" data-bs-target="#vendor" onClick={(e)=> /*setWorkOrderId(data.WOId)*/setVendor(data)}>{data.VendorName}</button></li></ul>

                        </td>

                        <td className='col-lg'><ul className='bul'><li>Assigned BSR Amt.</li><li><h5>{data.WOBSRAmount}</h5></li></ul></td>
                        <td className='col-lg'><ul className='bul'><li>Assigned NONBSR Amt.</li><li><h5>{data.WONonBSRAmount}</h5></li></ul></td>
                        <td className='col-lg'><ul className='bul'><li>Assigned Total Amt.</li><li><h5>{data.WorkOrderTotalAmount}</h5></li></ul>
                        </td><ul className='bul'>
                          <li><button className='btn btn-lik' onClick={(e)=>{navigate('/Dashboard/mbEntries',{state:{WO:data}})}}>SELECT</button></li>
                          <li><button className='btn-link nav-link' data-bs-toggle="modal" onClick={(e) => generateDaviation(data.WOId)} data-bs-target="#statement">DAVIATION STATEMENT</button></li>
                        </ul>
                        <td>

                        </td>
                      </tr>


                    })
                  }
                </tbody>
              </table>
            </div>
              
          </div>
        </div></div>


<WorkOrderDetails WO={workOrder} />
<VendorDetails Vendor={vendor} />
<ShowDaviation statement={daviation} />


      
    </div>
  )
}

const WorkOrderDetails=({WO})=>{
  console.log('work order: '+WO.WODate);
  return (
      <div id="standard-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="standard-modalLabel">Work Order Details</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
          </div>
          <div class="modal-body">
            
              <div className='row ps-lg-4'>

                <div className='col-sm-3'>
                  <span class="fw-bold me-2">Work OrderId</span><span className='mb-1'> <span>{WO.WOId}</span></span>
                </div>
                <div className='col-sm-5'>
                  <span class="fw-bold me-2">Work Order Name</span><span>{WO.WOName}</span>
                </div>
                <div className='col-sm-4'>
                  <span class="fw-bold me-2">Creation Date</span><span>{WO.WODate}</span>
                </div>
                <p></p>
                <div className='row'>
                  <div className='col-sm-3'>
                    <span class="fw-bold me-2">Work Order No</span><span>{WO.WONo}</span>
                  </div>
                  <div className='col-sm-3'>
                    <span class="fw-bold me-2">Vendor Name</span><span>{WO.VendorName}</span>
                  </div>
                </div>
                <p></p>
                <div className='row'>
                  <div className='col'>
                    <table class="table border mb-0">
                      <thead class="table-light">
                        <tr>
                          <th>Agreement no.</th>
                          <th>Agreement Date</th>
                          <th>Estimated Commencement Date</th>
                          <th>Estimated Completion Date</th>
                          <th>Actual Completion Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span>{WO.AgreementNo}</span></td>
                          <td><span>{WO.WODistributed}</span></td>
                          <td>Estimated Commencement Date</td>
                          <td><span>{WO.EstimatedCompletionDate}</span></td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <p></p>
                <div className='row'>
                  <div className='col-sm-4'>
                    <span class="fw-bold me-2">WO Prepared Office Code</span><span>{WO.PreparationOfficeCode}</span>
                  </div>
                  <div className='col-sm-4'>
                    <span class="fw-bold me-2">WO Execution Office Code</span><span>{WO.ExecutionOfficeCode}</span>
                  </div>
                </div><p></p>
                <div className='row '>
                  <div className='col-lg-6'>

                    <h5 class="header-title justify-content-left mb-3">Amount</h5>

                    <div class="table-responsive">
                      <table class="table mb-0">

                        <tbody>
                          <tr>
                            <td>BSR Amount</td>
                            <td><span>{WO.WOBSRAmount}</span></td>
                          </tr>
                          <tr>
                            <td>NONBSR Amount</td>
                            <td><span>{WO.WONonBSRAmount}</span></td>
                          </tr>
                          <tr>
                            <td>Tender Premium(+/- %)</td>
                            <td><span>{WO.TenderPremium}</span></td>
                          </tr>
                          <tr>
                            <th>Grand Total</th>
                            <td><span>{WO.WorkOrderTotalAmount}</span></td>
                          </tr>
                        </tbody>
                      </table>

                    </div></div>
                </div>

              </div> 

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const VendorDetails=({Vendor})=>{
  return (
<div id="vendor" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="standard-modalLabel">Vendor Details</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
            <div class="table-responsive">
            <table class="table">
                <tr><td className='fw-bold'>Name</td><td><span>{Vendor.VendorName}</span></td></tr>
                <tr><td className='fw-bold'>Login Name</td><td><span>{Vendor.VendorLoginName}</span></td></tr>
                <tr><td className='fw-bold'>Designation</td><td>Vendor</td></tr>
                <tr><td className='fw-bold'>Mobile</td><td>-</td></tr>
                <tr><td className='fw-bold'>Email</td><td>-</td></tr>
            </table>
            </div>
            </div>
        </div>
        </div>
      </div>)
}
const ShowDaviation=({statement})=>{
  console.log('display',statement);
  return(
  <div id="statement" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            {statement.map((data, index) =>{return (
            <div class="modal-body justify-content-center">
            <span class="fw-bold me-2" id="standard-modalLabel">Work Order <span key={index}>{data.WorkName} {data.OfficeName}</span></span>
            <button type='button' className='btn btn-link justify-content-right'>Print</button>
            <div class="table-responsive">
            <table class="table">
            <thead><tr className='border'>
              <th rowSpan={2}  className='border'>BOQ SNo</th>
              <th rowSpan={2} colSpan={4} className='border'>ITEM</th>
              <th rowSpan={2}>UNIT</th>
              <th colSpan={3} className='border'>Estimated (a)</th>
              <th colSpan={3} className='border'>AFTER DEVIATION (b)</th>
              <th colSpan={3} className='border'>EXECUTED (c)(AFTER FINAL BILL)</th>
            </tr>
            <tr className='border'>
              
              <th className='border'>Quantity</th>
              <th className='border'>Rate</th>
              <th className='border'>Amount</th>
              
              <th className='border'>Quantity</th>
              <th className='border'>Rate</th>
              <th className='border'>Amount</th>
              
              <th className='border'>Quantity</th>
              <th className='border'>Rate</th>
              <th className='border'>Amount</th>
            </tr>
            </thead>
              <tbody>
                <tr>
                  <td className='border'>{data.BOQ_Sno}</td>
                  <td key={index} className='border' colSpan={4}>
                  {data.ItemName}
                  </td>

                  <td key={index} className='border'>{data.Unit}</td>

                  <td key={index} className='border'>{data.TotalQty}</td>
                  <td key={index} className='border'>{data.ItemRate}</td>
                  <td className='border'>8820</td>

                  <td className='border'>10</td>
                  <td className='border'>882.00</td>
                  <td className='border'>8820</td>

                  <td className='border'>10</td>
                  <td className='border'>882.00</td>
                  <td className='border'>8820</td>
                </tr>
              </tbody>
              <thead className='border'>
                <tr>
                  <th colSpan={8} className='justify-content-center'>Total</th>
                  <th className='border'>8820</th>
                  <th colSpan={2} className='border'></th>
                  <th>8820</th>
                  <th colSpan={2} className='border'></th>
                  <th>8820</th>
                </tr>
                <tr>
                  <th colSpan={14}>Deviation (Estimated vs Modified WO) [(b-a)/a *100] </th>
                  <th>0.00%</th>
                </tr>
              </thead>
            </table>
            </div>
            </div>)})}
        </div>
        </div>
      </div>)
}
const getDaviationStatment=async(WOId)=>{
  let IsSuccess=false;
  console.log('executed: '+WOId);
  return await fetch("/api/GHSchedule/"+WOId, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('Token')
    }
  }).then((result) => {
    if (result.ok === true) {
      if (result.status === 200) {
        IsSuccess=true;
        return result.json();
      }
    }
  }).then((result)=>{
    return result.data;
  }).catch((err)=>{
    throw err;
  });
}