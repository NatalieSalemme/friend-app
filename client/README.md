Things to do:
-Create a route from profile to messaging. In order for both members to be able to post to the same page, I will sort both of their Id's. So when they post it will be on the same message thread. I also want to push each message into a messages array and maybe make an array of objects, where the message object will show the sender, the time, the message, the avatar, and the name.
-Create a friend request system, so when a user clicks on the plus sign on a profile, it will send a request to the user. This will most likely be similar to the messaging route. I will create a reducer and route so if the user accepts the friend request, that user's id is pushed onto a friends array, which will most likely be added to the profile schema.
-Create a way to be able to view friends on profile, open it up to a browse friends page and navigate to each profile from there.
-User's timeline will be filtered so only their friends's and their posts show up.
-Create a find friends function so user is able to type in a name and users will be filtered based on that criteria
-Create a graph data structure that will take a person's friends list, and offer friend suggestions based on who the user has the most mutual friends with
-Create a page to add favorite music/bands/tv shows. Create a graph to show recommended media
-Create error handling on all forms, pages that load data, and create a 404 page
