 
const helper = require('./helperFunctions');
const userDataBase = require('./users/userDb');

//custom middleware

// validates the user id on every request that expects a user id parameter

async function validateUserId(req, res, next) {
// if the id parameter is valid, store that user object as req.user
  const id = helper.paramsId(req)
  const users = await userDataBase.get();
  const checkIdArray = helper.IDnotInDatabase(id, users);
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
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" 
 else if(req.body.text === '') {
  res.status(400).json({ message: "missing required text field"})
} else { 
  next()
}
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}