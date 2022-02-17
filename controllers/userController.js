const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = (User) => {// USER MODEL //
  
  const getUsers = async (req, res)=>{
    const {query} = req;
    const response = await User.find(query);
    res.json(response);
  };


  const postUsers = async (req, res) =>{
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    res.json(user);
  };


  const getUserByUsername = async (req, res) =>{
    const {query} = req;
    const response = await User.findOne(query);
    res.json(response);
  }


  const putUser = async (req, res) => {
    const {body} = req;
    const response = await User.updateOne({
      _id: req.params.userId,
    },
    {
      $set: {
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        password: await bcrypt.hash(body.password, 10),
        email: body.email,
        adress: body.adress,
        phone: body.phone,
      },
    });
    res.json(response);
  };


  const deleteUser = async (req, res) =>{
    const {params} = req;
    await User.findByIdAndDelete(params.userId);
    res.status(202).json('the User has been deleted.');
  };


  const postLogIn = async (req, res) =>{
   
    const {body} = req;

    const user = await User.findOne({ 'userName': body.userName });

    if (user == null) {

      res.status(401).json('the User has not been found');

    } else if (await bcrypt.compare(body.password, user.password)) {
      
      const token = createToken(user);

      res.status(201).json(
        {message: 'token created successfully.',
        token});
  
    } else {
      res.status(401).json('Invalid password');
    }
  };


   const createToken = (user) =>{
    
    const payload = {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    }

   return jwt.sign(payload, 'secret', {expiresIn: '10m'});
   }

  return {getUsers, postUsers, putUser, deleteUser, postLogIn, getUserByUsername};
};

module.exports = userController;
