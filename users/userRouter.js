const express = require('express');

const router = express.Router();

const userDataBase = require('./userDb')
const postDataBase = require('../posts/postDb')

// POST A NEW USER AND ALL ERROR HANDLING WORKS
router.post('/', async(req, res) => {
  const user = req.body;
  try {
    if (user.name === '') {
      res.status(400).json({ errorMessage: "Please provide a name for the user." })
    } else {
      const addUser = await userDataBase.insert(user)
      res.status(201).send(addUser)
    }
  } catch {
    res.status(500).json({errorMessage: 'There was an error adding information to the database'})
  }
});
// ADDS A POST FOR A USER AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE
router.post('/:id/posts', validateUserId, async(req, res) => {
  const id = paramsId(req)
  const changes = req.body;
  changes.user_id = id
  try {
    if(changes.text === '') {
      res.status(400).json({errorMessage: "Please provide text"})
    } else {
      const addPost = await postDataBase.insert(changes)
      res.status(201).send(addPost)
    }
  }
  catch {
    res.status(500).json({errorMessage: 'There was an error adding information to the database'})
  }
});

// GET'S ALL THE USER AND ALL ERROR HANDLING WORKS
router.get('/', async(req, res) => {
  const users = await userDataBase.get();
  try {
    if (users == '') {
      res.status(404).json({message: "No Users are in the database"})
    } else {
      res.status(200).send(users);
    }
  } catch(err) {
    res.status(500).json({errorMessage: err})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER  MIDDLEWARE
router.get('/:id', validateUserId,  async(req, res) => {
  const id = paramsId(req)
  try {
      const getUserById = await userDataBase.getById(id)
      console.log(id)
      res.status(200).send(getUserById);
     }
   catch {
      res.status(500).json({errorMessage: 'There was an error getting information from the database'})
  }
});

// GET USER'S POSTS BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE
router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const getUserPost = await userDataBase.getUserPosts(paramsId(req))
    console.log(getUserPost)
    if(getUserPost.length >= 1) {
      res.status(200).send(getUserPost);
    } else {
      res.status(404).json({message: "This user does not have any posts"})
    }
  } catch {
    res.status(500).json({errorMessage: 'There was an error getting this user\'s posts from the database'})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER  MIDDLEWARE
router.delete('/:id', validateUserId, async(req, res) => {
  await userDataBase.remove(paramsId(req));
  try {
    res.status(200).send('The user was removed')
  } catch {
    res.status(500).json({errorMessage: "There was an error connecting to the database"})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE
router.put('/:id', validateUserId, async(req, res) => {
try {
    const changes = req.body
    const updateUser = await userDataBase.update(paramsId(req), changes)
    if(changes.name === '') {
      res.status(400).json({errorMessage: "Please provide a name"})
      
    } else {
      //this is not being logged
      console.log(updateUser)
      res.status(200).send(updateUser)
    }
  } catch {
    res.status(500).json({errorMessage: "There was an error connecting to the database"})
  }
});

//custom middleware

// validates the user id on every request that expects a user id parameter

async function validateUserId(req, res, next) {
// if the id parameter is valid, store that user object as req.user
  const id = paramsId(req)
  const users = await userDataBase.get();
  const checkIdArray = IDnotInDatabase(id, users);
  // if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" } 
  if(checkIdArray === 0 ) {
      //TODO: THIS ERROR IS NOT BEING LOGGED
      res.status(400).json({message: "Invalid user ID"})
    } else {
      next()
    }

}

//  validates the body on a request to create a new user

function validateUser(req, res, next) {
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
}

//   validates the body on a request to create a new post

function validatePost(req, res, next) {
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
}

// reusable functions

function paramsId(req) {
  const { id } = req.params;
  return id
} 

function IDnotInDatabase(id, users) {

  const isIdinDatabase = users.filter(user => user.id == id)
  
  if(isIdinDatabase.length > 0) {
    return 1;
  } else {
    return 0
  }

}
module.exports = router;
