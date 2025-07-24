const UserService = require('../services/user-service');

const userService = new UserService;

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data:response,
            success:true,
            message:'User Created Successfully',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'User Registration Failed',
            err : error
        })
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email , req.body.password);
        return res.status(201).json({
            data:response,
            success:true,
            message:'User SignedIn Successfully',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'User SignIn Failed',
            err : error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message:'User Authenticated Successfully and Token is Valid',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'User Authentication Failed',
            err : error
        })
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data:response,
            success:true,
            message:'Successfully Fetched Admin Status',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Admin Status Check Failed',
            err : error
        })
    }
}



module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}