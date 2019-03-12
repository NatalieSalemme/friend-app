import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showFilteredProfiles } from '../../actions/profileActions';
import FilteredProfilesList from './FilteredProfilesList';

class FilterProfile extends Component {
  state = {
    errors: {},
  };
  componentDidMount() {
    let name = this.props.match.params.name;
    this.props.showFilteredProfiles(name);
  }
  //
  // componentDidUpdate(prevProps) {
  //   let name = this.props.match.params.name;
  //   if (prevProps.match.params != name) {
  //     // this.props.showFilteredProfiles(name);
  //
  //
  //   }
  // }

  render() {
    const { match } = this.props;
    const { profiles } = this.props.profile;
    let content;

    if (!profiles) {
      content = <h3>No profiles found</h3>;
    } else {
      content = (
        <div>
          <FilteredProfilesList profiles={profiles} />
        </div>
      );
    }

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
        {content}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { showFilteredProfiles }
)(FilterProfile);
