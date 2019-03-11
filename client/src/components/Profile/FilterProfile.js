import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showFilteredProfiles } from '../../actions/profileActions';
import FilteredProfilesList from './FilteredProfilesList';

class FilterProfile extends Component {
  componentDidMount() {
    let name = this.props.match.params.name;
    this.props.showFilteredProfiles(name);
  }
  render() {
    const { match } = this.props;
    const { profiles } = this.props.profile;
    console.log('&&&&&&&&&', profiles);
    return (
      <div>
        <h1 className="text-center mt-5">
          Showing search results for {match.params.name}
        </h1>
        <FilteredProfilesList profiles={profiles} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { showFilteredProfiles }
)(FilterProfile);
