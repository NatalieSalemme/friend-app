import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showFilteredProfiles } from '../../actions/profileActions';
import FilteredProfilesList from './FilteredProfilesList';

class FilterProfile extends Component {
  componentDidMount() {
    let name = this.props.match.params.name;
    this.props.showFilteredProfiles(name);
  }
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.match.params.name == this.props.match.params.name;
  // }
  render() {
    console.log('match', this.props.match.params.name);
    const { match } = this.props;
    const { profiles } = this.props.profile;

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',

          padding: '4em 0 8em 0',
          marginBottom: '-3em',
        }}
      >
        <h1 className="text-center mt-3 mb-5">
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
