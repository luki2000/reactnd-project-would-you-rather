# Would You Rather Project

This project is a polls project. The existing user of the app will have a number of features at his/her disposal, namely:

### View polls

The user has the ability to view all existing polls, on the homepage the application will automatically list the polls that he/she has
answered as well as those that have not been answered.

### Answer a poll

Once you go view a poll, you are taking to the page with the poll. You will be asked to pick what you would rather do/have. However
If you have already answered it will instead only allow you to view the results of the poll, yu will see which one you had selected 
and how many in total all users voted for.

### Create a poll

You can create a poll too! Simply go to the new question page and fill in the two fields that will be the option that users will have 
to choose between to rather do/have.

### Leaderboard

Feeling feisty? The more questions you create and answer the higher you are rated amongst your peers. Head to the leaderboard page to
see who is on top and beat them if you have to. Get to work!.

## Development Appraoch and self learning

This project has been an interesting journey, both of planning and learning. Before coding I scribbled a lot of diagrams on paper to understand the data flow and components involved. I also reviewed the lesson on real world react-redux app. I wanted to strike a balance between minimizing accesses to the store whilst at the same reduce the number of levels to pass down props. Redux is extremely flexible in that aspect  and once I created the first reducers, actions and connects etc.., the rest of the projects flowed nicely. It is important to note that what really helped me was starting to focus on the login feature, I knew that the rest of the application heavily depended on it and it would have been extremely difficult to implement last as most likely it would require a lot of refactoring to display the right content based on logged in user. I stumbled accross Tyler's article on private routes https://tylermcginnis.com/react-router-protected-routes-authentication/ which basically kicked started my project. I had to adjust it to work with react-redux and my project needs. unfortunately the commit details was lost as I needed to init a new repo. 


## Project Sources

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Contributing

This repository is the starter code for *all* Udacity students. Therefore, we most likely will not accept pull requests. For details, check out [CONTRIBUTING.md](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/CONTRIBUTING.md).
