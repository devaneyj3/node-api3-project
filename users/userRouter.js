const express = require('express');

const router = express.Router();

const userDataBase = require('./userDb')
const postDataBase = require('../posts/postDb')

// GET'S ALL THE USER AND ALL ERROR HANDLING WORKS
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
// ADDS A POST FOR A USER AND ALL ERROR HANDLING WORKS
router.post('/:id/posts', async(req, res) => {
  const id = paramsId(req)
  console.log(id)
  const changes = req.body;
  changes.user_id = id
  const users = await userDataBase.get();
  const checkIdArray = IDnotInDatabase(id, users)
  console.log(checkIdArray)
  try {
    //error works
    if(changes.text === '') {
      res.status(400).json({errorMessage: "Please provide text"})
      //this does not work
    } else if(checkIdArray === 0) {
      res.status(404).json({errorMessage: "That user does not exist in the database"})
    }
    else {
      const addPost = await postDataBase.insert(changes)
      res.status(201).send(addPost)
    }
  }
  catch {
    res.status(500).json({errorMessage: 'There was an error adding information to the database'})
  }
});

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

router.get('/:id', async(req, res) => {
  const getUserById = await userDataBase.getById(paramsId(req))
  res.status(200).send(getUserById);
});

router.get('/:id/posts', async (req, res) => {
  const getUserPost = await userDataBase.getUserPosts(paramsId(req))
  try {
    res.status(200).send(getUserPost);
  } catch {
    res.send(404).json({message: "This user does not have any posts"})
  }
});

router.delete('/:id', async(req, res) => {
  const removeUser = await userDataBase.remove(paramsId(req));
  try {
    if(removeUser <= 0 ) {
      //TODO: THIS ERROR IS NOT BEING LOGGED
      json.send(404).json({message: "This user was already deleted or was not found"})
    }
    else {
      res.status(200).send('This user was removed')
      }
  } catch {
    res.status(500).json({errorMessage: "There was an error connecting to the database"})
  }
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// validates the user id on every request that expects a user id parameter

function validateUserId(req, res, next) {
// if the id parameter is valid, store that user object as req.user
const { id } = req.params;

// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" } 
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
