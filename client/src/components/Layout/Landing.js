import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container ">
            <div className="row">
              <div className="col-md-12 text-center mt-5 landing-info-container">
                <h1 className="display-3 mb-4">Friend Search</h1>
                <p className="lead" style={{ margin: '-1.2em 0 1.6em 0' }}>
                  {' '}
                  Stay connected with friends, meet someone new, reunite with an
                  old friend!
                </p>
                <hr />
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
