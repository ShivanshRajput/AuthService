const { User , Role } = require('../models/index');

class UserRepositary{

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
            const user = User.findOne({
                where:{
                    email: UserEmail
                }
            });
            return user;
        } catch (error) {
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