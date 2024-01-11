# Kendalls-Social-Media

## Description

API creation for a social network application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Within this application, the technologies used include Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Installation

In order to install this onto your own device, you will need to clone the repository to your local machine. Once you have cloned the repository, you will need to install the required dependencies by running the following command: npm install. Then you will need to start the server by running the following command: npm start.

## Usage

Link to Demo video! https://drive.google.com/file/d/112dRfPOghFEFYNxOKF3F2q0rSFhTRoLS/view 

In order to test that it is working properly, you will go into Insominia and the following calls to find the data:

`/api/users`
    - `GET` All Users
    - `POST` Create a User

`/api/users/:userId`
    - `GET` A single user by ID
    - `PUT` Update a user by ID

`/api/users/:userId/friends/:friendId`
    - `POST` Add a new friend to a user's friend list
    - `DELETE` Remove a friend from a user's friend list

`/api/thoughts`
    - `GET` All Thoughts
    - `POST` Create a Thought

`/api/thoughts/:thoughtId`
    - `GET` A single thought by ID
    - `PUT` Update a thought by ID
    - `DELETE` Delete a thought by ID

`/api/thoughts/:thoughtId/reactions`
    - `POST` Create a reaction stored in a single thought's reactions array field
    - `DELETE` Delete a reaction by the reaction's reactionId value


## License

This project is licensed under the MIT license.

## Questions

If you have any questions please contact me at <kendallpfenning@gmail.com> or through my GitHub account [kpfenning](https://github.com/kpfenning).