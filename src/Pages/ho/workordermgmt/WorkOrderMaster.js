import React, { useEffect, useState } from 'react'

export default function WorkOrderMaster() {
  const[workOrderList,setWorkOrderList]=useState([]);
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
            
            setWorkOrderList(res.data);
            
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
  }, []);
  return (
    <div><h2>WorkOrderMaster</h2>
      <div>
      <div class="tab-content">
        <div className="card" id="multi-item-preview">
          <div className='card-body'>

            <h4 class="header-title mb-3">Record List</h4>

            <div class="table-responsive">

              <table class="table mb-0">


                <tbody>
                  {workOrderList.map((data,index)=>{
                    return <tr className='producst-datatable_wrapper' key={index} >
                        <td>{index + 1}.</td>
                        <td className='col-lg-2 '>

                          <p class="mb-0">
                            <button class="btn btn-link text-success me-2" style={{padding:0}} data-bs-toggle="modal" data-bs-target="#standard-modal">{data.WOName}</button>

                            <h6 class="text-uppercase mt-0">WO Id</h6>
                            <h2 class="my-2" id="active-users-count">{data.WOId}</h2>

                            <span className='text-nowrap'> <i class="mdi mdi-calendar-range font-13"></i>{data.WODate}
                            </span>
                          </p>
                        </td>
                        <td className='col-lg-2'><ul className='bul'><li>Work Order No. <b>{data.WONo}</b></li><li><i class="mdi mdi-square text-danger"></i>Nodal office {data.ExecutionOfficeCode}</li><li><i class="mdi mdi-square text-primary"></i><button class="btn btn-link text-danger m2" style={{padding:0}} data-bs-toggle="modal" data-bs-target="#vendor">{data.VendorName}</button></li></ul>

</td>

<td className='col-lg-2' ><h6 style={{textAlign:'right',textDecoration:'underline',paddingBottom:'0'}}>Amount</h6>
<ul className='bul' style={{borderRight:'thin solid #eef2f7', padding:'2px'}}>
<li className='border-bottom'>NONBSR - <b style={{float:'right'}}>{data.WONonBSRAmount} </b></li>
<li className='border-bottom'>BSR - <b style={{float:'right'}}>{data.WOBSRAmount}</b></li>
<li>Total - <b style={{float:'right'}}>{data.WorkOrderTotalAmount}</b></li>
</ul></td>
<td className='col-lg-1'><h6 style={{textDecoration:'underline'}}>Remarks</h6><ul className='bul'><li><button className='btn btn-link' style={{padding:'0'}}>View/Add</button></li></ul></td>
<td className='col-lg-1'><h6 style={{textDecoration:'underline'}}>Actions</h6>
<ul className='bul' style={{borderLeft:'thin solid #eef2f7', padding:'2px'}}>
  <li>
  <button className='btn btn-link border' style={{padding:'2px', margin:'2px'}}><i class="mdi mdi-download ms-1"></i>Delete</button>
  </li><li>
  <button className='btn btn-link border' style={{padding:'2px', margin:'2px'}}><i class="mdi mdi-download ms-1"></i>Finalise</button>
  </li>
</ul>
</td>
<td className='col-lg'><h6 style={{textDecoration:'underline'}}>Download</h6>
<ul className='bul' style={{borderLeft:'thin solid #eef2f7', padding:'2px'}}><li>
<button className='btn btn-link border' style={{padding:'2px', margin:'2px'}}><i class="mdi mdi-download ms-1"></i> Schedule G/H</button>
</li><li>
<button className='btn btn-link  border' style={{padding:'2px', margin:'2px'}}><i class="mdi mdi-download ms-1"></i> Letter Of Acceptance</button>
<button className='btn btn-link border' style={{padding:'2px', margin:'2px'}}><i class="mdi mdi-download ms-1"></i> Work Order</button>
</li>
</ul>
</td>
     </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
