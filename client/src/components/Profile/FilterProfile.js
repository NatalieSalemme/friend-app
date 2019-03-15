import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showFilteredProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import FilteredProfilesList from './FilteredProfilesList';

class FilterProfile extends Component {
  state = {
    errors: {},
  };
  componentDidMount() {
    let name = this.props.match.params.name;
    this.props.showFilteredProfiles(name);
  }

  render() {
    const { match } = this.props;
    const { profiles, loading } = this.props.profile;
    // console.log(typeof profiles);

    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!profiles) {
      // console.log('empty');
      content = <h4 className="text-center">No profiles found</h4>;
    } else {
      // console.log('has something');
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
