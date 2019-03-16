## Live Demo 
https://salemme-friend-search-app.herokuapp.com/

## How to Start 
git clone
https://github.com/NatalieSalemme/friend-search.git

npm install
cd client npm install

in root, in 'config' directory, add keys_dev.js file. Entering your own credentials

module.exports = {
mongoURI: 'yourmongoURIhere',
secretOrKey: 'yoursecretkeyhere',
};

Friend search

Inspired by Brad Traversy's course found at https://www.udemy.com/mern-stack-front-to-back/learn/v4/overview

New Features I added: 
-User can send, receive, and accept friend requests
-Customized profile with friends, hobbies, and bucket lists displayed
-User can to go to a different page to see all the friend's a user has
-User can post comments on a profile
-Filtered feed that only includes the current users and the current users time, this is filtered by time, which is displayed through MomentJS
-User can update their account information(name, email, password)
-If a user has friend requests, the amount is showed in a box on the navigation bar
-User can use the footer to navigate to various pages on the site
-User is able to use the search bar to find all profiles that match their query
- User is able to upload their own profile picture, which is saved to the database as a buffer, and used throughout the site, if the user has not uploaded a photo, an anonymous photo is put it in its place 
