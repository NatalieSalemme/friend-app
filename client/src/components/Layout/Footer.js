import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    const { profile, loading } = this.props.profile;

    let content;
    if (profile === null || loading) {
      // content = <Spinner />;
      content = null;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <Link to={`/profile/${profile.handle}`} className="text-white">
            My Profile
          </Link>
        );
      } else {
        // User is logged in but has no profile
        content = null;
      }
    }

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
                Friend Search
              </h6>
              <hr
                className="accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#6351ce' }}
              />
              <p>
                Become friends with people all around the world. Share your
                interests with them, show off your hobbies, find a new adventure
                buddy!
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-white">
              <h6 className="text-uppercase font-weight-bold pt-5">Friends</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#6351ce' }}
              />
              <p>
                <Link to="/dashboard" className="text-white">
                  Dashboard
                </Link>
              </p>
              <p>
                <Link to="/feed" className="text-white">
                  Feed
                </Link>
              </p>
              <p>
                <Link to="/profiles" className="text-white">
                  Browse
                </Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-white pt-5">
              <h6 className="text-uppercase font-weight-bold">My Links</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: '60px', backgroundColor: '#6351ce' }}
              />
              <p>
                <Link to="/edit-profile" className="text-white">
                  Edit Profile
                </Link>
              </p>
              <p>
                <Link to="/add-experience" className="text-white">
                  Add Experience
                </Link>
              </p>
              <p>
                <Link to="/add-education" className="text-white">
                  Add Education
                </Link>
              </p>
              {content}
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
            <a
              href="http://www.yesmillennial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-white pl-2">Natalie Salemme</span>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Footer);
