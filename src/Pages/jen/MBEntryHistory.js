import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function MBEntryHistory() {
    const location = useLocation();
    console.log('props',location.state);
    const MBBook=location.state.MBBook;
    const MBBookInfo=location.state.MBBookInfo;
    const[BookHistory,setBookHistory]=useState([]);
    useEffect(()=>{
      if(MBBook!==null){
        fetch('/api/MBEntries',{
          method:'post',
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Token')
          },
          body:JSON.stringify({"MBId":MBBook.MBEntryId,"MBBookId":MBBook.MBBookId,"LoginName":MBBook.LoginName,"Role":MBBook.RoleToPerform})
        }).then((result)=>{
          if(result.ok && result.status===200)
          return result.json();
        }).then((result)=>{
          console.log('history:',result.data);
          setBookHistory(result.data);
        }).catch((err)=>{
          throw err;
        });
      }
    },[]);
  return (
    <div><div className='card'>
    <div className='card-body'>
    <div className='row'>
        <div className='col-md-4'>
            <strong>WorkOrder Id </strong>
        </div>
        <div className='col-md-4'>
            <strong>Agreement No </strong>
        </div>
        <div className='col-md-4'>
            <strong>Assigned BSR Amount </strong>
        </div>
    </div>
    </div>
    </div>
    <div class="table-responsive">

              <table class="table mb-0">
              {BookHistory?
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Entry Date</th>
                  <th>Item Name</th>
                  <th>Item Description</th>
                  <th>Remark</th>
                  <th>Dimensions</th>
                  <th>Quantity</th>
                  <th>Modifications</th>
                </tr>
              </thead>
              :<thead><tr><th>No Records found</th></tr></thead>}

                <tbody>
                  {
                    BookHistory.map((data, index) => {
                      return <tr className='producst-datatable_wrapper' key={index} >
                        <td>{index + 1}.</td>
            <td className='card'><div><span class="badge bg-danger">{data.EntryDate}</span>
                                            <h5 class="mt-2 mb-2">
                                                {data.mbForWhichBill}
                                            </h5>
                                            <p class="mb-0">
                                            <h3 class="align-middle">{data.MB_Inspection_User}</h3><span class='text-muted'>{data.MB_Inspection_User?'Inspected By':null}</span>
                                            </p>
                                        </div></td>
                        <td className='col-lg-4'>
                          <p class="mb-0">
                            {data.ItemName}
                          </p>
                        </td>
                        <td className='col-lg-2'>
                        <p class="mb-0">
                            {data.Description}
                          </p>
                        </td>

                        <td className='col-lg'><button className='btn btn-link' data-bs-toggle="modal" data-bs-target="#statement">View</button><Remarks remark={data.Remark}/></td>
                        <td className='col-lg'><ul className='bul'><li>Assigned NONBSR Amt.</li><li><h5>{data.WONonBSRAmount}</h5></li></ul></td>
                        <td className='col-lg'><h5>{data.Qty}</h5>
                        </td>
                      </tr>


                    })
                  }
                </tbody>
              </table>
                  
            </div>
    </div>
  )
}
const Remarks=({remark})=>{
  console.log('display',remark);
  remark.replace(/<(?:.|\n)*?>/gm,',');
  return(
  <div id="statement" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="standard-modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body justify-content-center">
            <div class="table-responsive">
            <h5>Remarks</h5>
            {remark.replace(/<(?:.|\n)*?>/gm,',')}
            {
              
            }
            
            </div>
            </div>
          </div>
        </div>
      </div>)
}