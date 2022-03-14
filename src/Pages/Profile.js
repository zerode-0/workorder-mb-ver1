import React, { useEffect, useState } from 'react'

export default function Profile() {
    const[userInfo, setUserInfo]=useState({});
    const[edit,setEdit]=useState(false);
    useEffect(() => {
       
    },[]);
    
  return (
  
    <div className='row'>
    <div className='col-lg-4'></div>
    <div className='col-lg-4'>
    <div className='card text-center'>
    <div className='card-body'>
    <i class="mdi mdi-account-circle avatar mb-2 font-20"></i>
    <h4 class="mb-0 mt-2">{localStorage.getItem('LoginName')}</h4>
    <p class="text-muted font-14">{localStorage.getItem('RoleType')}</p>
    {!edit?
    <button type="button" class="btn btn-success btn-sm mb-2" onClick={(e)=>{e.preventDefault();setEdit(!edit);}}>Edit</button>:null
    }
    <div class="text-start mt-3 ">
                                            <h4 class="font-13 text-uppercase">About Me :</h4>
                                            <p class="text-muted font-13 mb-3">
                                                Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the
                                                1500s, when an unknown printer took a galley of type.
                                            </p>
                                            <p class="text-muted mb-2 font-13"><div className="input-group input-group-merge"><h5>Full Name</h5> <input class="ms-2 form-control" disabled={!edit?true:false} defaultValue={localStorage.getItem('FullName')||''}/></div></p>

                                            <p class="text-muted mb-2 font-13"><div className="input-group input-group-merge"><h5>Mobile :</h5><input class="ms-2 form-control" disabled={!edit?true:false} defaultValue={localStorage.getItem("Mobile")}/></div></p>

                                            <p class="text-muted mb-2 font-13"><div className="input-group input-group-merge"><h5>Email :</h5><input class="ms-2 form-control" disabled={!edit?true:false} defaultValue={localStorage.getItem("Email")}/></div></p>

                                            <p class="text-muted mb-1 font-13"><div className="input-group input-group-merge"><h5>Location :</h5><input class="ms-2 form-control" disabled={!edit?true:false} defaultValue={'India'}/></div></p>
    </div>
    {edit?<div><button type="button" class="btn btn-success btn-sm mb-2" onClick={(e)=>{e.preventDefault();setEdit(!edit);}}>Save</button> <button type="button" class="btn btn-success btn-sm mb-2" onClick={(e)=>{e.preventDefault();setEdit(false);}}>Cancel</button></div>:null}
    </div>
    </div>
    </div>
    </div>        

  )
}
