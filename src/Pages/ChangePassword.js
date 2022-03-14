import React, { useEffect, useState } from 'react'

export default function ChangePassword() {
    const[module,setModule]=useState(1);
    const[captcha,setCaptcha]=useState('');
    useEffect(async()=>{
        setCaptcha(await generateCaptcha());
        console.log('cap: '+captcha);
    },[]);
    const generateCaptcha=async()=>{
        let IsSuccess=false;
        return await fetch("/api/capcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({'DeviceID':'kdfshJKGjkggjKkJH'}),
        }).then((res) => {
          if(res.ok){
          IsSuccess=true;
          console.log('success');
          return res.json();
          }}).then((data)=>{
            console.log('data : ',data.data.Capcha);
            return data.data.Capcha;})
          .catch((err)=>{
            throw err;
          });
       }

       const generateOTP=async()=>{
        let IsSuccess=false;
        return await fetch("/api/Login/ReqOTP", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({'username':localStorage.getItem('LoginName')}),
        }).then((res) => {
          if(res.ok){
          IsSuccess=true;
          console.log('success');
          return res.json();
          }}).then((data)=>{
            console.log('data : ',data.data.Capcha);
            return data.data.Capcha;})
          .catch((err)=>{
            throw err;
          });
       }
  return (
    <div className='row text-center'>
    <div className='col-lg-3'></div>
    <div className='col-lg-5'>
        <div className='card'>
        <div className='card-header'>Change Password</div>
            <div className='card-body'>
            <i class="mdi mdi-account-circle avatar mb-2 font-20"></i>
    <h4 class="mb-0 mt-2">{localStorage.getItem('LoginName')}</h4>
    <p class="text-muted font-14">{localStorage.getItem('RoleType')}</p>
                <div className="mb-3" style={{ textAlign: "center" }}><div class="form-check form-check-inline"><input type={'radio'} name='module' id='otp' className='form-check-input' value={1} checked={module===1} onChange={(e)=>{setModule(1)}}/> <label htmlFor='otp' className='form-check-label'>By One Time password</label></div><div class="form-check form-check-inline"><input type={'radio'} className='form-check-input' name='module' id='password' value={2} checked={module===2} onChange={(e)=>{setModule(2)}}/> <label htmlFor='password' className='form-check-label'>By One Time password</label></div></div>
                {module===1
                ?
                <div class="text-start mt-3">
                                            <p class="text-muted mb-2 font-13"><strong><button className='btn btn-link'>send Otp</button> </strong> <div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'number'} placeholder='OTP' /></div></p>

                                            <p class="text-muted mb-2 font-13"><strong>New Password </strong><div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'password'} placeholder='New Password' /></div></p>

                                            <p class="text-muted mb-2 font-13"><strong>Confirm Password</strong> <div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'password'} placeholder='Confirm Password' /></div></p>

                                            <p class="text-muted mb-2 font-13"><strong>Captcha </strong><div className="mb-3" style={{ textAlign: "left" }}><div className="input-group input-group-merge">{<img src={"data:image/png;base64," + captcha}/>}<input className='form-control' type={'password'} placeholder='Confirm Password' />
                                            <button className="btn btn-link"  type={'button'} onClick={async(e)=>{e.preventDefault();setCaptcha(await generateCaptcha())}}><i className="md dripicons-clockwise mt-3"></i></button>
                                            </div></div></p>

                                            <p class="text-muted">
                                                <button class="btn btn-success btn-sm mb-2">Update Password</button>
                                            </p>

                </div>
                :
                module===2
                ?
                <div class="text-start">
                                            <p class="text-muted"><strong>Old Password </strong><div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'password'} placeholder='Old Password' /></div></p>

                                            <p class="text-muted"><strong>New Password</strong><div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'password'} placeholder='New Password' /></div></p>

                                            <p class="text-muted"><strong>Confirm Password</strong><div className="mb-3" style={{ textAlign: "left" }}><input className='form-control' type={'password'} placeholder='Confirm Password' /></div></p>

                                            <p class="text-muted"><strong>Captcha :</strong><div className="mb-3" style={{ textAlign: "left" }}><div className="input-group input-group-merge">{<img src={"data:image/png;base64," + captcha}/>}<input className='form-control' type={'text'} placeholder='Captcha' />
                                            <button className="btn btn-link"  type={'button'} onClick={async(e)=>{e.preventDefault();setCaptcha(await generateCaptcha())}}><i className="md dripicons-clockwise mt-3"></i></button>
                                            </div></div></p>

                                            <p class="text-muted">
                                                <button class="btn btn-success btn-sm mb-2">Update Password</button>
                                            </p>

                </div>
                :null
                }
            </div>
        </div>
    </div>
    </div>
  )
}
