import React, { useEffect, useState } from "react";
import Webcam from 'react-webcam';
import axios from "axios";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};
const FacecaptchaScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);
  
  useEffect(() => {
      setName(name);
      setEmail(email);
      console.log(name, email);
  }, [name, email ]);
  const submitHandler = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    const splitDataURI = pictureSrc.split(',');
    var data = JSON.stringify({
      "file": splitDataURI[1]
    });
    
    var request = new XMLHttpRequest();
    request.withCredentials = false;
    
    request.addEventListener("readystatechange", (event) => {
      if(event.target.readyState === 4) {
        console.log(event.target.responseText);
        const obj = JSON.parse(event.target.response);
        console.log(obj);
        if(obj.result && obj.result[0].box.probability > 0.7) {
          window.location.href = "http://www.google.com";
        } else {
          setPicture('');
        }
      }
    });

    request.addEventListener( 'error', (event) => {
      console.log(event.target.responseText);
    });

    request.open("POST", "http://localhost:8000/api/v1/detection/detect");
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("x-api-key", "00000000-0000-0000-0000-000000000003");
    
    request.send(data);
  
  });
  return (

    <div className="container mt-lg-5 mt3">
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>


      {/* Username */}
      <div className="col-md-6">
        <div className="form">
          <label for="account-fn">Full Name</label>
          <input
            className="form-control"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* email */}
      <div className="col-md-6">
        <div className="form">
          <label for="account-email">Email Address</label>
          <input
            className="form-control"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      </div>
      <button onClick={submitHandler} className="btn btn-primary" > SUBMIT
      </button>
    </div>

  );
};

export default FacecaptchaScreen;
