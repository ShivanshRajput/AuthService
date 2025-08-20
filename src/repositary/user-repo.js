const { StatusCodes } = require('http-status-codes');
const { User , Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');


class UserRepositary{

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                Where :{
                    id: userId
                }
            })
        } catch (error) {
            console.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes: ['id' , 'email']
            });
            return user;
        } catch (error) {
            console.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }

    async getByEmail(UserEmail){
        try {
            const user = await User.findOne({
                where:{
                    email: UserEmail
                }
            });
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid Email sent in the request',
                    'Email of user is not signed in, no record found',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log(error);
            console.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:"ADMIN"
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }
}

module.exports = UserRepositary;