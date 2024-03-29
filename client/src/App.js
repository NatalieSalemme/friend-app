import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-info/EditProfile';
import EditAccount from './components/edit-info/EditAccount';
import EditPhoto from './components/edit-info/EditPhoto';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import IdProfile from './components/Profile/IdProfile';
import AllFriends from './components/Profile/AllFriends';
import FilterProfile from './components/Profile/FilterProfile';

import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import Messages from './components/messages/Messages';
import MessageThread from './components/messages/MessageThread';
import MessagesFrom from './components/messages/MessagesFrom';
import MyFriendRequests from './components/friends/MyFriendRequests';

// import NotFound from './components/not-found/NotFound';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <div>
              <Route exact path="/" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/profile/user/:id" component={IdProfile} />
              <Route
                exact
                path="/profile/filter/:name"
                component={FilterProfile}
              />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-account"
                  component={EditAccount}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/users/me/avatar"
                  component={EditPhoto}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/posts/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/messages/all" component={Messages} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/messages/reply/:id"
                  component={MessageThread}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/messages/from/:senderId"
                  component={MessagesFrom}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/friendrequests/to/me"
                  component={MyFriendRequests}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/user/friends/:id"
                  component={AllFriends}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
