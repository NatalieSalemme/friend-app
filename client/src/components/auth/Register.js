import React, {Component} from 'react';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';

class Register extends Component {

  render() {
    return (<div>
      <Landing>
        <h3 style={{marginTop: '-1em'}}>Sign Up</h3>
        <form>
          <div className="form-group col-md-6 mx-auto">
            <input type="name" className="form-control"  aria-describedby="emailHelp"
              name="name" placeholder="Name"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <input type="email" className="form-control "  aria-describedby="emailHelp"
              name="email" placeholder="Enter email"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <input type="password" className="form-control"
              name="password" placeholder="Password"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <input type="password" className="form-control"  aria-describedby="emailHelp"
              name="password2" placeholder="Confirm password"/>
          </div>

          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">I agree to the terms and conditions</label>
          </div>
          <button type="submit" className="btn btn-primary" style={{margin: '1.5em'}}>Create Account</button>
        </form>
        <p>Already have an account?
          <Link to="/login" className="ml-2 font-weight-bold text-primary">Login here</Link>
        </p>
      </Landing>

    </div>);
  }

}

export default Register;
