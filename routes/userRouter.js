const express = require('express');
const validator = require('express-joi-validation').createValidator();
const {validatePost, validateGetName, validateGetId, validatePut, validateLogin} = require('../validationSchemas/usersValidation.js');
const userController = require('../controllers/userController');


const routes = (User) => {
  const userRouter = express.Router();

  const {getUsers, postUsers, putUser, deleteUser, postLogIn, getUserByUsername} = userController(User);

      userRouter.route('/users')
        .get(validator.query(validateGetId), getUsers)
        .post(validator.body(validatePost), postUsers)
 
      userRouter.route('/users/search')
        .get(validator.query(validateGetName), getUserByUsername)

      userRouter.route('/users/:userId')
        .put(validator.body(validatePut), putUser)
        .delete(deleteUser);
      
      userRouter.route('/users/login')
        .post(validator.body(validateLogin), postLogIn);
      
  return userRouter;
};

module.exports = routes;
