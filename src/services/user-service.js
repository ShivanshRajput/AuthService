const UserRepositary = require('../repositary/user-repo');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor() {
        this.userRepositary = new UserRepositary();
    }

    async create(data){
        try {
            const user = await this.userRepositary.create(data);
            return user;
        } catch (error) {
            console.log('Something went wrong at Service Layer');
            throw error;
        }
    }


    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log('Something went wrong in Token Creation');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in Token Validation' , error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log('Something went wrong in password comparison');
            throw error;
        }
    }
}


module.exports = UserService;