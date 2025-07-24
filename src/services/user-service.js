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

    async signIn(email, plainPassword){
        try {
            // step 1 : fetch the user using the email
            const user = await this.userRepositary.getByEmail(email);

            // step 2 : compare incoming plainPassword with stored encryptedPassword
            const passwordsMatch = this.checkPassword(plainPassword , user.password);

            if(!passwordsMatch){
                console.log('Password Doesnt match');
                throw {error: 'Incorrect Password'}
            }

            //step 3 : if password matches, then create a token and sent it to the user
            const newJWT = this.createToken({
                email: user.email,
                id: user.id
            });
            return newJWT;
        } catch (error) {
            console.log('Something went wrong in SignIn');
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error :'Invalid Token'};
            }
            const user = await this.userRepositary.getById(response.id);
            if(!user){
                throw {error :'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
                console.log('Something went wrong in Authentication');
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
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log('Something went wrong in password comparison');
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            return await this.userRepositary.isAdmin(userId);
        } catch (error) {
            console.log("Something Went wrong while fetching ADMIN status in service layer");
            throw error;
        }
    }

}


module.exports = UserService;