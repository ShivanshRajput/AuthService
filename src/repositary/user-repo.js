const { User } = require('../models/index');

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
            cconsole.log('Something went wrong at Repositary Layer');
            throw error;
        }
    }
}

module.exports = UserRepositary;