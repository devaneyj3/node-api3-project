const express = require('express');
const helper = require('../helperFunctions');
const middleware = require('../middleware');

const router = express.Router();

const userDataBase = require('./userDb')
const postDataBase = require('../posts/postDb')

// POST A NEW USER AND ALL ERROR HANDLING WORKS WITH VALIDATE USER MIDDLEWARE WORKSç
router.post('/', middleware.validateUser, async(req, res) => {
  try {
    const addUser = await userDataBase.insert(req.body)
    res.status(201).send(addUser)
  } catch {
    res.status(500).json({message: 'There was an error adding information to the database'})
  }
});
// ADDS A POST FOR A USER AND ALL ERROR HANDLING WORKS WITH VALIDATE USER AND VALIDATE USER ID MIDDLEWARE WORKS
router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, async(req, res) => {
  const id = helper.paramsId(req)
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
router.get('/:id', middleware.validateUserId,  async(req, res) => {
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
router.get('/:id/posts', middleware.validateUserId, async (req, res) => {
  try {
    const getUserPost = await userDataBase.getUserPosts(helper.paramsId(req))
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
router.delete('/:id', middleware.validateUserId, async(req, res) => {
  const  id = helper.paramsId(req) 
  await userDataBase.remove(id);
  try {
    res.status(200).send(id)
  } catch {
    res.status(500).json({message: "There was an error connecting to the database"})
  }
});

// GET USER BY ID AND ALL ERROR HANDLING WORKS WITH VALIDATE USER  AND VALIDATE USER ID MIDDLEWARE
router.put('/:id', middleware.validateUserId, middleware.validateUser, async(req, res) => {
  try {
    await userDataBase.update(paramsId(req), req.body)
    res.status(200).send(req.body)
    
  } catch {
    res.status(500).json({message: "There was an error connecting to the database"})
  }
});


module.exports = router;
