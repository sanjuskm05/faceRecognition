import React from "react";

const Footer = () => {
  return (
    <>
      <div>
        {/* Top Header */}
        <div className="Announcement">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center display-none">
                {/* <p>+234 809 386 3638</p> */}
                <p>dlcfederoad@gamil.com</p>
              </div>
              <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-item-center">
                <a href="">
                  <i className="fab fa-facebook"></i>
                </a>

                <a href="">
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a href="">
                  <i className="fa-brands fa-twitter"></i>
                </a>

                <a href="https://youtube.com">
                  <i className="fab fa-youtube"></i>
                </a>

                <a href="">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
