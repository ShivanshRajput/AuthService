const validateUserAuth = (req,res,next) => {
    if(
        !req.body.email || 
        !req.body.password
    ){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err:'Email or Password missing in incoming request'
        })
    }
    next();
}

const validateIsAdminRequest = (req,res,next) => {
    if(!req.body.userId){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err:'userId missing in incoming request'
        })
    }
    next();
}


module.exports = { 
    validateUserAuth,
    validateIsAdminRequest
}