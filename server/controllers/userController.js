const { Users } = require("../models")
const ApiError = require("../errors/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const generateJWT = (id, firstName, lastName, email, role) => {
    return jwt.sign(
        {id, firstName, lastName, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '72h'} //learn more 
    )
}

class UserController {
    async getUserName(req, res, next) {
        try {
            const { id } = req.params;
            const user = await Users.findByPk(id, {
                attributes: ['firstName', 'lastName'] // Вибираємо тільки потрібні поля
            });
            
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }
    
            return res.json(user);
        } catch (err) {
            return next(ApiError.badRequest(err.message));
        }
    }
    
    async registration(req, res, next) {
        try {
            const {email, firstName, lastName, password, role} = req.body

            if(!email || !password) {
                return next(ApiError.badRequest('Email and password are required'))
            }

            if(!lastName || !firstName) {
                return next(ApiError.badRequest('First and Last name are required'))
            }

            const candidate = await Users.findOne({where: {email}})

            if (candidate) {
                return next(ApiError.badRequest('User with this email already exist'))
            }

            const hashPassword = await bcrypt.hash(password, 5) // create zminna
            const user = await Users.create({email, firstName, lastName, role, password: hashPassword})
            const token = generateJWT(user.id, user.firstName, user.lastName, user.email, user.role) 

            return res.json({token})
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({where: {email}})
           
            if(!user) {
                return next(ApiError.badRequest('User with this email not found'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)

            if(!comparePassword) {
                return next(ApiError.badRequest('Incorrect password'))
            }
            const token = generateJWT(user.id, user.firstName, user.lastName, user.email, user.role) 

            return res.json({token})
        }
        catch(err){
            return next(ApiError.badRequest(err))
        }
    }

   
    async update(req, res, next) {
        try {
            const user = await Users.findByPk(req.user.id)
            const {firstName, lastName, email, newPassword, currentPassword} = req.body

            let comparePassword = bcrypt.compareSync(currentPassword, user.password)

            if(!comparePassword) {
                return next(ApiError.badRequest('Incorrect password'))
            }

            if (firstName !== undefined ) user.firstName = firstName;
            if (lastName !== undefined) user.lastName = lastName;
            if (email !== undefined) user.email = email;
            if (newPassword !== undefined && newPassword !== '') {
                const hashPassword = await bcrypt.hash(newPassword, 5)
                user.password = hashPassword;
            }

            await user.save()

            const token = generateJWT(user.id, user.firstName, user.lastName, user.email, user.role) 

            return res.json(token)
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }

    async check(req, res) {
        try {
            const token = generateJWT(req.user.id, req.user.email, req.user.role)

            return res.json({token})
        }
        catch(err) {
            return next(ApiError.badRequest(err))
        }
    }
}

module.exports = new UserController()