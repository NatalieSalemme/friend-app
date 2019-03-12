Things to do:
-Create a route from profile to messaging. In order for both members to be able to post to the same page, I will sort both of their Id's. So when they post it will be on the same message thread. I also want to push each message into a messages array and maybe make an array of objects, where the message object will show the sender, the time, the message, the avatar, and the name.
-Create a find friends function so user is able to type in a name and users will be filtered based on that criteria. add functionality so it refreshes component when user types in a new name
-Create a graph data structure that will take a person's friends list, and offer friend suggestions based on who the user has the most mutual friends with
-Create a page to add favorite music/bands/tv shows. Create a graph to show recommended media
-Create error handling on all forms, pages that load data, and create a 404 page
-Remove handle from all profiles and instead replace all routes with an id to make it easier and avoid duplicate components/routes

-Put timestamp on comments
-Add registration validation on check terms and conditions
-Fix filter function, as of right now, it's on a <Link> tag, which takes it to the filterProfile component with query parameters, but when it is pushed multiple times, url is concatenated with /profile/filter/:name each time
-On browse, filter out people who are not your friends
-Add ability for users to upload their photos

-Activities-can mark if interested
-Profile -upload image here
-Messaging
-File upload
-Able to join groups of people with similar interests

-Able to have a chatbox between people
-Able to filter through friends who have similar interests
