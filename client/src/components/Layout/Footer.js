import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer font-small mt-5">
      <div style={{ backgroundColor: '#6351ce' }}>
        <div className="container">
          <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-md-0">
              <h6 className="mb-0 text-white">
                Get connected with us on social networks!
              </h6>
            </div>

            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a href="delete.html" className="fb-ic">
                <i className="fab fa-facebook-f text-white mr-4"> </i>
              </a>

              <a href="delete.html" className="tw-ic">
                <i className="fab fa-twitter text-white mr-4"> </i>
              </a>

              <a href="delete.html" className="gplus-ic">
                <i className="fab fa-google-plus-g text-white mr-4"> </i>
              </a>

              <a href="delete.html" className="li-ic">
                <i className="fab fa-linkedin-in text-white mr-4"> </i>
              </a>

              <a href="delete.html" className="ins-ic">
                <i className="fab fa-instagram text-white"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer text-center text-md-left bg-dark">
        <div className="row">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-white">
            <h6 className="text-uppercase font-weight-bold pt-5">
              Company name
            </h6>
            <hr
              className="accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px', backgroundColor: '#6351ce' }}
            />
            <p>
              Here you can use rows and columns here to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-white">
            <h6 className="text-uppercase font-weight-bold pt-5">Products</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px', backgroundColor: '#6351ce' }}
            />
            <p>
              <a href="delete.html">MDBootstrap</a>
            </p>
            <p>
              <a href="delete.html">MDWordPress</a>
            </p>
            <p>
              <a href="delete.html">BrandFlow</a>
            </p>
            <p>
              <a href="delete.html">Bootstrap Angular</a>
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-white pt-5">
            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px', backgroundColor: '#6351ce' }}
            />
            <p>
              <a href="#!">Your Account</a>
            </p>
            <p>
              <a href="#!">Become an Affiliate</a>
            </p>
            <p>
              <a href="#!">Shipping Rates</a>
            </p>
            <p>
              <a href="#!">Help</a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-white pt-5">
            <h6 className="text-uppercase font-weight-bold">Contact</h6>
            <hr
              className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: '60px', backgroundColor: '#6351ce' }}
            />
            <p>
              <i className="fas fa-home mr-3" />
              San Diego, CA
            </p>
            <p>
              <i className="fas fa-envelope mr-3" /> natalie@yesmillennial.com
            </p>
            <p>
              <i className="fas fa-phone mr-3" /> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print mr-3" /> + 01 234 567 89
            </p>
          </div>
        </div>

        <div className="footer-copyright text-center py-3 text-white">
          © 2019 Copyright:
          <a href="http://www.yesmillennial.com" target="_blank"
          rel="noopener noreferrer"
          >
            <span className="text-white pl-2">Natalie Salemme</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
