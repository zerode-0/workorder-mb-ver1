import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function MBEntries(props) {
    const[mbEntries, setMbEntries]=useState([]);
    const[mBListAbstract, setmBListAbstract]=useState([]);
    const[mBEntryModel, setmBEntryModel]=useState([]);
    const[mBListRoleTypeHeader, setListRoleTypeHeader]=useState([]);
    console.log('',mbEntries);
    let location=useLocation();
    useEffect(()=>{
        console.log('loc',location);
        fetch("/api/MbEntryList/"+location.state.WO.WOId, {
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
                    setMbEntries(res.data.mBEntryModel);    
                    console.log('',res.data.mmBListAbstract);
                    setmBListAbstract(res.data.mBListAbstract);   
                    setmBEntryModel(res.data.mBEntryModel);
                    setListRoleTypeHeader(res.data.mBListRoleTypeHeader);
                });
              }
            }
          });
    },[location]);
const getRemarks=async(MbBookId)=>{
  let isSuccess=false;
  let data=await fetch("/api/MbHistory/"+MbBookId, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('Token')
    }
  }).then((result) => {
    if (result.ok === true) {
        isSuccess=result.ok;
      }
      return result.json();
  });
  console.log('data: ',data);
}
   
  return (
    <div>
    <br></br>
    <div className='card'>
    <div className='card-body'>
    <div className='row'>
        <div className='col-md-4'>
            <strong>WorkOrder Id </strong>{location.state.WO.WOId}
        </div>
        <div className='col-md-4'>
            <strong>Agreement No </strong>{location.state.WO.AgreementNo}
        </div>
        <div className='col-md-4'>
            <strong>Assigned BSR Amount </strong>{location.state.WO.WOBSRAmount}
        </div>
    </div>
    <div className='row'>
        <div className='col-md-4'>
            <strong>WorkOrder </strong>
            <button class="btn btn-link text-success me-2" style={{padding:0}} data-bs-toggle="modal" data-bs-target="#standard-modal">{location.state.WO.WOName}</button>
        </div>
        <div className='col-md-4'>
            <strong>Vendor </strong><button class="btn btn-link text-danger m2" style={{padding:0}} data-bs-toggle="modal" data-bs-target="#vendor">{location.state.WO.VendorName}</button>
        </div>
        <div className='col-md-4'>
            <strong>Assigned NonBSR Amount </strong>{location.state.WO.WONonBSRAmount}
        </div>
    </div>
    <div className='row'>
        <div className='col-md-4'>
            <strong>Date </strong>{location.state.WO.WODate}
        </div>
        <div className='col-md-4'>
            <strong>MB Assigned </strong>{location.state.WO.WODate}
        </div>
        <div className='col-md-4'>
            <strong>Total Amount </strong>{location.state.WO.WorkOrderTotalAmount}
        </div>
        </div>
        <div className='row'>
        <div className='col-md' style={{textAlign:'right'}}>
          <button onClick={getRemarks(36)}>Remarks</button>
          <button>G/H Schedule</button>
        </div>
        </div>
    </div>
    
    </div>
   {/* <div className='card'>

        <table className='table table-reponsive'><tr>
        {mBEntryModel.map((abstract,hIndex)=>{
           return <td>{abstract.MBBookId}<br></br>MBBookId</td>
        })}
                    {
                    mBListAbstract.map((abstract,index)=>{
                       return(
                       <td>{abstract.RoleToPerform}<br></br>{abstract.LoginName}</td>
                       )
                    })}
        </tr>
        </table>
        </div>
   */}
      <div className='card'>
    
    <table className='table table-reponsive no-border'>
    
        <thead>
            <tr>
            <th>S.No.</th>
                <th>MB Book</th>
                <th>Progress Report</th>
                <th>MBEntry (Started on)</th>
            {mBListRoleTypeHeader.map((data,index)=>{
                return <th key={index}>
                    {data.RoleToPerform
                    }<br></br>{data.LoginName}
                </th>
            })}
                <th>Payment Status</th>
            </tr>
        </thead>
    <tbody>
    {mBEntryModel.map((data,index)=>{
      return  <tr className='border' key={index}>
            <td>{index+1}</td>
            <td className='card'><div><span class="badge bg-danger">MBE ID {data.MBEntryId}</span>
                                            <h5 class="mt-2 mb-2">
                                                {data.mbForWhichBill}
                                            </h5>
                                            <p class="mb-0">
                                            <h3 class="align-middle">{data.MBBookId}</h3><span class='text-muted'>MBBook ID</span>
                                            </p>
                                        </div></td>
            <td>{'-'}</td>
            <td>{data.EntryDate}</td>
            {mBListAbstract.map((abs,aindex)=>{
                if(abs.MBEntryId===data.MBEntryId)
                return<td key={aindex}><ul className='bul'>
                <li>{abs.CompDt?<button className='btn btn-link' style={{padding:0}}><i className='mdi dripicons-checkmark text-success'></i> <Link to='/Dashboard/mbEntries/MbEntriesHistory' state={{MBBook:abs,MBBookInfo:data}}>{abs.CompDt}</Link></button>:<span><i className='dripicons-hourglass '></i> Pending</span>}</li>
                <li><button className='btn btn-link' style={{padding:0}}><i class="mdi dripicons-user text-primary"></i> {abs.LoginName}</button></li>
                </ul>
                </td>
                else
                return null;
            })}
        </tr>
    })}
    </tbody>
    </table>
    </div>
    <WorkOrderDetails WO={location.state.WO} />
    <VendorDetails Vendor={location.state.WO} />
    </div>
  )
}

const WorkOrderDetails=({WO})=>{
    return WO?(
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
    ):null;
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