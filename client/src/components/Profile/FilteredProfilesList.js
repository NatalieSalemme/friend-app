import React, { Component } from 'react';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';

class FilteredProfilesList extends Component {
  render() {
    const { profiles } = this.props;
    console.log(profiles);

    let mappedResults;
    if (!profiles) {
      return <Spinner />;
    } else {
      mappedResults = profiles.map((profile, i) => (
        <ProfileItem key={i} profile={profile} />
      ));
    }
    return (
      <div className="container col-md-12">
        <div className="row">
          <div className="card-deck mx-auto d-flex justify-content-around col-md-8">
            {mappedResults}
          </div>
        </div>
      </div>
    );
  }
}

export default FilteredProfilesList;
