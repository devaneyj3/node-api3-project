const express = require('express');

const router = express.Router();

const userDataBase = require('./userDb')
const postDataBase = require('../posts/postDb')

// POST A NEW USER AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE WORKS
router.post('/', validateUser, async(req, res) => {
  try {
    const addUser = await userDataBase.insert(req.body)
    res.status(201).send(addUser)
  } catch {
    res.status(500).json({message: 'There was an error adding information to the database'})
  }
});
// ADDS A POST FOR A USER AND ALL ERROR HANDLING WORKS WITH VALIDATE USER AND VALIDATE USER ID MIDDLEWARE WORKS
router.post('/:id/posts', validateUserId, validatePost, async(req, res) => {
  const id = paramsId(req)
  req.body.user_id = id
  try {
      const addPost = await postDataBase.insert(req.body)
      res.status(201).send(addPost)
  }
  catch {
    res.status(500).json({message: 'There was an error adding information to the database'})
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
      res.status(200).send(getUserById);
     }
   catch {
      res.status(500).json({message: 'There was an error getting information from the database'})
  }
});

// GET USER'S POSTS BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE
router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const getUserPost = await userDataBase.getUserPosts(paramsId(req))
    if(getUserPost.length >= 1) {
      res.status(200).send(getUserPost);
    } else {
      res.status(404).json({message: "This user does not have any posts"})
    }
  } catch {
    res.status(500).json({message: 'There was an error getting this user\'s posts from the database'})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER  MIDDLEWARE
router.delete('/:id', validateUserId, async(req, res) => {
  const  id = paramsId(req) 
  await userDataBase.remove(id);
  try {
    res.status(200).send(id)
  } catch {
    res.status(500).json({message: "There was an error connecting to the database"})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER  AND VALIDATE USER ID MIDDLEWARE
router.put('/:id', validateUserId, validateUser, async(req, res) => {
  try {
    await userDataBase.update(paramsId(req), req.body)
    res.status(200).send(req.body)
    
  } catch {
    res.status(500).json({message: "There was an error connecting to the database"})
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
      res.status(400).json({message: "Invalid user ID"})
    } else {
      next()
    }

}

//  validates the body on a request to create a new user

function validateUser(req, res, next) {
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
  if(Object.keys(req.body) < 1) {
    res.status(400).json({ message: 'missing user data'})
  }
    // if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
   else if (req.body.name === '') {
    res.status(400).json({ message: "missing required name field"})
  } else {
    next()
  }
}

//   validates the body on a request to create a new post

function validatePost(req, res, next) {
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
if(Object.keys(req.body) < 1) {
  res.status(400).json({ message: "missing post data"})
}
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
 else if(req.body.text === '') {
  res.status(400).json({ message: "missing required text field"})
} else { 
  next()
}
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
