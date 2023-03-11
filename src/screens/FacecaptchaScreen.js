import React, { useEffect, useState } from "react";

import axios from "axios";

const FacecaptchaScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
      setName(name);
      setEmail(email);
      console.log(name, email);
  }, [name, email ]);
  const submitHandler = (e) => {
    console.log("Submit clicked");
  };
  return (
    
      <div className="container mt-lg-5 mt3">
    
            <form className="row form-container" onSubmit={submitHandler}>
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
                <button type="submit"> SUBMIT
                </button>
                
              </form>
      </div>

  );
};

export default FacecaptchaScreen;
