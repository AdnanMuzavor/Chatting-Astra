
# The Chatting Astra
 It'a a real time chatting application where user after being authenticated can create a chat and have real time conversation with online  users.

## Tech stacks used
### Frontend :  React.js, HTML, CSS, Bootstrap
### Backend  :  Node.js, Express.js
### Database :  MongoDB
### Tools    :  Postman, VS Code, Socket.io

## Key Features

It is a real time website where user can:
- signup and login.
- search for other users. 
- can create a chat with any serached user after being authenticated.
- can create groups and being group admin have privilege to add/remove members and rename group. 
- can leave a group if group member.

# The file/folder structure

#### Backend Folder

```
This is the main folder of projects. It has all impoortant sub folders
namely folders for modals,middleware,routers and app.js file
```
#### backend folder , sub-folders and their significance/ key role in project

| Folder/File Name | Realted to     | Description        | 
| :-------- | :------- | :------------------------- |
| `app.js` | `Backend` | Main file that joins all the Server parts into one. |
| `Middleware` | `Backend` | **Authenticates** the user using jwt token. |
| `config` | `Backend` | Deals with **DB connection**, creates and returns **token**.|
| `routers` | `Backend` | It has **API routes** related to different entities e.g **user**|
| `controllers` | `Backend` | Definition of functions called when **API request** is made.|
| `models` | `database` | Define database schemas for entities in the website.|


# The file/folder structure

#### Frontend Folder

```
This folder represents the client side of the project. It has all impoortant sub folders
namely folders namely actions, reducers used for redux, components and screens folder for react etc.
```
#### frontend folder , sub-folders and their significance/ key role in project

| Folder/File Name | Realted to     | Description        | 
| :-------- | :------- | :------------------------- |
| `Actions` | `Frontend/Redux` | Have actions to be dispatched when different actions/events occur. |
| `Components` | `Frontend` |Has subfolders which further has components related to sub-folder-names. |
| `Constants` | `Frontend/Redux` | Have constants used in various Actions.|
| `Reducers` | `Frontend/Redux` | As per the action dispatched along with payload sent from action,it updates the state accordingly|
| `Screen` | `Frontend` | This folder has different screens in the app.|


