const express = require('express');
const postDB = require('./postDb');
const helper = require('../helperFunctions');

const router = express.Router();

router.get('/', async(req, res) => {
  const getPost = await postDB.get();
  try {
    res.status(200).send(getPost)
  } catch {
     res.status(500).json({message: 'There was an error getting information from the database'})
  }
});

router.get('/:id', validatePostId, async(req, res) => {
  const { id } = req.params;
  const getPostById = await postDB.getById(id)
  try {
    res.status(200).send(getPostById)
  } catch {
    res.status(500).json({ message: "There is an error with the database" });
  }
});

router.delete('/:id', validatePostId, async(req, res) => {
   const { id } = req.params;
  await postDB.remove(id)
  try {
    res.status(200).send(`The post with the id ${id} has been deleted`)
  } catch {
    res.status(500).json({ message: "There is an error with the database" });
  }
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

async function validatePostId (req, res, next) {
  // if the id parameter is valid, store that user object as req.user
  const id = helper.paramsId(req)
  const users = await postDB.get();
  const checkIdArray = helper.IDnotInDatabase(id, users);
  // if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" } 
  if (checkIdArray === 0) {
    res.status(400).json({ message: "Invalid post ID" })
  } else {
    next();

  }
}

module.exports = router;
