import express from "express";
import {UserRepo} from "../repository/UserRepo.js";
import UserModel from "../model/User.js";
import {IUser} from "../model/User.js";
import bodyParser from "body-parser";
const userRepository = new UserRepo(UserModel);
const userRouter = express.Router();
const jsonParser=bodyParser.json();


userRouter.post('/login',jsonParser,(request,response)=> {
    userRepository.findByEmailAndPassword(request.body.email, request.body.password).then((data) => {
        response.json(data);
    });
});

userRouter.post('/register',jsonParser,(request,response)=> {
    const user : IUser={
        email: request.body.email,
        password: request.body.password
    };
    userRepository.saveUser(user).then((data) => {
        console.log(data._id);
        response.json(data);
    });
});

export default userRouter;
