import React, { useState, useEffect, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { sha512 } from "js-sha512";
export default function Home() {
  const[module,setModule]=useState(true);
  const[maxOTP,setMaxOTP]=useState(0);
  const[message,setMessage]=useState();
  const navigate = useNavigate();
  const [error,setError]=useState('');
  const[captcha,setCaptcha]=useState('');
  const[formData, setFormData]=useReducer(formReducer,{});
  const Hash = "ankit";
  useEffect(async() => {
    
    setCaptcha(await generateCaptcha());
    console.log('scaptcha',captcha);
  }, []);

    const handleKey=(event)=>{
      
      if(event.target.form.name==='byPassword' && event.key==='Enter')
      loginByPassword(event);
      if(event.target.form.name==='byOTP' && event.key==='Enter')
      loginByOTP(event);
    }
  


  const loginByPassword=async(event)=>{
event.preventDefault();
debugger;
if (formData.username == "") {
  alert("Enter Login Id..");
  document.getElementById('userid').focus();
  return false;
}
if(formData.password.length===0){
  alert('Password can not be blank');
  document.getElementById('password').focus();
  return false;
}
if(formData.captcha==""){
alert('Captha Cant be blank');
  document.getElementById('captcha').focus();
  return false;
}
if (formData.password.length > 18) {
  alert("Invalid Password..");
  return false;
}
let hashedpassword = await sha512(formData.password);
    hashedpassword = sha512(hashedpassword.toUpperCase() + Hash);
    setFormData( {pass: hashedpassword
    });
    document.getElementsByName('password').value=hashedpassword;
    let item = { 'username': formData.username, 'password':hashedpassword, 'Hash': Hash,'Capcha':formData.captcha,'DeviceID': 'kdfshJKGjkggjKkJH'};
    fetch("/api/Login/getToken", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      if (result.ok == true) {
        if (result.status == 200) {
          result.json().then((res) => {
            localStorage.setItem("Token", 'Bearer '+res.data.Token);
            localStorage.setItem("UserId", res.data.UserId);
            localStorage.setItem("FullName", res.data.FullName);
            localStorage.setItem("LoginName", res.data.LoginName);
            localStorage.setItem("RoleId", res.data.RoleId);
            localStorage.setItem("RoleType", res.data.RoleType);
            localStorage.setItem("Mobile", res.data.Mobile);
            localStorage.setItem("Email", res.data.Email);
            localStorage.setItem("IsDivision", res.data.IsDivision);
            localStorage.setItem("IsForest", res.data.isForest);
            localStorage.setItem("DeptId", res.data.DeviceID);
            localStorage.setItem("OfficeCode", res.data.OfficeCode);
            localStorage.setItem("OfficeName", res.data.OfficeName);
            navigate("/Dashboard");
            //window.location.reload();
          });
        }
      }
      else{
        result.json().then((res)=>{
          console.log('error',res);
          setError(res.Message);
          setFormData({reset:true});
          document.getElementsById('username').focus();
        });
        
      }
    });
  }
  const loginByOTP=async(event)=>{
    console.log('login by OTP',formData.captcha);
    event.preventDefault();
    debugger;
    if (formData.username == "") {
      alert("Enter Login Id..");
      document.getElementById('userid').focus();
      return false;
    }
    if(formData.captcha==""){
    alert('Captha Cant be blank');
      document.getElementById('captcha').focus();
      return false;
    }
        let item = {'DeviceID':'kdfshJKGjkggjKkJH','username': formData.username,'OTP':formData.otp};
        fetch("/api/ValidateByOTP", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }).then((result) => {
          if (result.ok == true) {
            if (result.status == 200) {
              result.json().then((res) => {
                console.log('token: '+res.data.Token);
                localStorage.setItem("Token", 'Bearer '+res.data.Token);
                localStorage.setItem("UserId", res.data.UserId);
                localStorage.setItem("FullName", res.data.FullName);
                localStorage.setItem("LoginName", res.data.LoginName);
                localStorage.setItem("RoleId", res.data.RoleId);
                localStorage.setItem("RoleType", res.data.RoleType);
                localStorage.setItem("Mobile", res.data.Mobile);
                localStorage.setItem("Email", res.data.Email);
                localStorage.setItem("IsDivision", res.data.IsDivision);
                localStorage.setItem("IsForest", res.data.isForest);
                localStorage.setItem("DeptId", res.data.DeviceID);
                localStorage.setItem("OfficeCode", res.data.OfficeCode);
                localStorage.setItem("OfficeName", res.data.OfficeName);
                navigate("/Dashboard");
                //window.location.reload();
              });
            }
          }
          else{
            result.json().then((res)=>{
              console.log('hh',res);
              setError(res.Message);
              setFormData({username:'',password:'',captcha:''});
              document.getElementsByName('username').focus();
            });
            
          }
        });
      }
  const sendOTP=async(event)=>{
    event.preventDefault();
    
    if (formData.username == "") {
      alert("Enter Login Id..");
      document.getElementById('userid').focus();
      return false;
    }
    if(formData.captcha==""){
    alert('Captha Cant be blank');
      document.getElementById('captcha').focus();
      return false;
    }
    if(maxOTP>3){
     setMessage(<span className="text-center text-danger">Otp can be sent only 3 times</span>);
     return;
    }
        let item = { 'username': formData.username,'DeviceID': 'kdfshJKGjkggjKkJH'};
        let status;
        const mes=await fetch("/api/ReqOTP", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }).then((result) => {
          if (result.ok == true) {
            status=result.ok;
            return result.json();
          }
        }).then((result)=>{
          console.log('message',result);
          if(status){
            setMaxOTP(maxOTP+1);
          return <span className="text-center text-success">{result.Message}</span>;
          }
          else{
          return <span className="text-danger">{result.Message}</span>
          }
        }).catch((err)=>{
          throw err;
        });
        setMessage(mes);
      }
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
const handleChange=(event)=>{
  event.preventDefault();
  setFormData({name:event.target.name,
  value:event.target.value});
}
  return (
    localStorage.getItem("Token")===null?
    <div>
      <React.Fragment>
        <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
          <div className="container">
            <div className="row justify-content-center">
            <div className="col-xxl-4 col-lg-5">
            Welcome to

IFMS - WORKORDER MB SYSTEM

WorkOrder MB System is an integrated part of the IFMS (Integrated Financial Management system) that provides the functionality of preparing Schedule G/H, Letter Of Acceptance and WorkOrder. Thereafter, it also provides the functionality of managing MB Books, MB Entries and Preparing MB Abstract which are being verified at different stages from the competent authorities. 

            </div>
              <div className="col-xxl-4 col-lg-5">
                <div className="card" style={{boxSizing:'border-box', boxShadow:'0 0 20px 1px #6c757d'}}>
                  <div className="card-header pt-4 pb-4 text-center bg-primary">
                    
                      <span>
                        {/* <img src="assets/images/logo.png" alt="" height="18" /> */}
                        <h4 className="text-white text-center pb-0 fw-bold">
                        IFMS WORKORDER MB SYSTEM
                      </h4> 
                      
                      </span>
                    
                    <h4 className="text-white text-center pb-0 fw-bold">
                        SIGN IN
                      </h4>
                    <p><button className="btn btn-link font-20 text-white text-center" onClick={async(e)=>{e.preventDefault();setModule(!module);setCaptcha(await generateCaptcha())}}>{module?<i className="mdi mdi-toggle-switch-off"></i>:<i className="mdi mdi-toggle-switch"></i>}</button>
                      </p>
                      {/*module?<h4 className="text-white text-center pb-0 fw-bold">By Username</h4>:<h4 className="text-white text-center pb-0 fw-bold">By OTP</h4>*/}
              
                  </div>{message}
                  <div className="card-body p-4">
                    {module
                    ?
                    <form action='#' name='byPassword'>
                  <strong className="text-danger">{error}</strong>
                      <div className="mb-3" style={{ textAlign: "left" }}>
                        <label htmlFor='userid' className="form-label">
                          Username
                        </label>
                        <input id='username' name="username" 
                          className="form-control"
                          type="text"
                          onChange={handleChange}
                          required=""
                          placeholder="Enter your Username"  onKeyDown={(e)=>{handleKey(e)}} value={formData.username||''}
                        />
                      </div>

                      <div className="mb-3" style={{ textAlign: "left" }}>
                        <a
                          href="pages-recoverpw.html"
                          className="text-muted float-end"
                        >
                          <small>Forgot your password?</small>
                        </a>
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="input-group input-group-merge">
                          <input id='password' name='password'
                            type="password" tabIndex={2}
                            onChange={handleChange}
                            className="form-control"
                            value={formData.password || ''} onKeyDown={(e)=>{handleKey(e)}} placeholder={'Password'}
                          />
                        </div>
                      </div>
                      <div className="mb-3 mb-3">
                      <div className="input-group input-group-merge">
                      {<img src={"data:image/png;base64," + captcha}/>}
                      <input id='captcha' name='captcha'
                            type="text" tabIndex={3}
                            onChange={handleChange}
                            className="form-control"
                             onKeyDown={(e)=>{handleKey(e)}} placeholder={'CaptchaCode'} value={formData.captcha||''}
                          />
                          <button className="btn btn-link"  type={'button'} onClick={async(e)=>{e.preventDefault();setCaptcha(await generateCaptcha())}}><i className="md dripicons-clockwise mt-3"></i></button>
                          </div>
                      </div>

                    
                      
                      <div className="mb-3 mb-0 text-center">
                        <button
                          className="btn btn-primary"
                          type="button" disabled={formData.username && formData.password && formData.captcha?false:true}
                          onClick={loginByPassword}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    :
                    
                      maxOTP>0?
                      <form action="#" name='byOTP'>
                    <div className="mb-3" style={{ textAlign: "left" }}>
                        <label htmlFor='userid' className="form-label">
                          Username
                        </label>
                        <input id='username' name='username'
                          className="form-control"
                          type="text" tabIndex={1}
                          onChange={handleChange}
                          required=""
                          placeholder="Enter your Username"  onKeyDown={(e)=>{handleKey(e)}}
                        />
                        <button className="btn btn-link" style={{padding:0}} type={'button'} onClick={sendOTP}>Resend Otp</button>
                      </div>
                      <div className="mb-3" style={{ textAlign: "left" }}>
                        <label htmlFor='otp' className="form-label">
                          One-Time-Password
                        </label>
                        <input id='otp' name='otp'
                          className="form-control"
                          type="number" tabIndex={1}
                          onChange={handleChange}
                          required=""
                          placeholder="One Time Password"  onKeyDown={(e)=>{handleKey(e)}}
                        />
                      </div>
                      {/*
                      <div className="mb-3 mb-3">
                      <div className="input-group input-group-merge">
                      <img src={"data:image/png;base64," + captcha}/>
                      <input name='captcha'
                            type="text" tabIndex={3}
                            onChange={handleChange}
                            className="form-control"
                             onKeyDown={(e)=>{handleKey(e)}} placeholder={'CaptchaCode'}
                          />
                          <button className="btn btn-link" onClick={async(e)=>{e.preventDefault();setCaptcha(await generateCaptcha())}}><i className="md dripicons-clockwise"></i></button>
                          </div>
                          
                      </div>*/}

                      <div className="mb-3 mb-0 text-center">
                          <button
                          className="btn btn-primary"
                          type="button"
                          onClick={loginByOTP} disabled={formData.username && formData.otp?false:true}
                        >
                          Login
                        </button>
                        </div>
                        </form>
                      :
                      <form action="#">
                    <div className="mb-3" style={{ textAlign: "left" }}>
                        <label htmlFor='userid' className="form-label">
                          Username
                        </label>
                        <input id='username' name='username'
                          className="form-control"
                          type="text" tabIndex={1}
                          onChange={handleChange}
                          required=""
                          placeholder="Enter your Username"  onKeyDown={(e)=>{handleKey(e)}}
                        />
                      </div>
                      <div className="mb-3 mb-0 text-center">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={sendOTP}
                        >
                          Generate OTP
                        </button>
                      </div>
                      </form>
                      
                    }
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <p className="text-muted">
                      Don't have an account?{" "}
                      <a href="pages-register.html" className="text-muted ms-1">
                        <b>Sign Up</b>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer footer-alt">
          2018 - 2021 © Hyper - Coderthemes.com
        </footer>
      </React.Fragment>
    </div>
    :<Navigate to='/Dashboard'/>
  );
}
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      apple: '',
      count: 0,
      name: '',
      'gift-wrap': false,
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
 }