import React,{useState}from 'react';
import appLogo from './../images/logo/budget-tracker.png';
import { Redirect } from "react-router-dom";

const SplashScreen = () => {

  const [wait , setWait] = useState(true);

  setTimeout(() => { 
    setWait(false)
  }, 1500)

  return !wait ? <Redirect to="/dashboard" /> :
  (  
    <div className="flex h-screen">
        <div class="m-auto">
          <img className="object-center h-40 w-40 mx-auto" src={appLogo} alt="app-logo"></img>
        </div>
    </div>
  );
}

export default SplashScreen;
