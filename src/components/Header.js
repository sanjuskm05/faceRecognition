import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container">
              <div className="row">
                <div className="col-6 d-flex align-items-center justify-content-end Logo">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}

          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/"></Link>
              </div>

              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>

                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
