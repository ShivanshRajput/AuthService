const UserRepositary = require('../repositary/user-repo');

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
}


module.exports = UserService;