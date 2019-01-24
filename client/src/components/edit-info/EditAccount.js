import React, { Component } from 'react';
import { connect } from 'react-redux';
class EditAccount extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center mt-5">Edit Account</h1>
      </div>
    );
  }
}

export default connect()(EditAccount);
