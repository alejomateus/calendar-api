const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Response = require('../utils/response');

async function login(req, res) {
    try {
        let body = req.body;
        userDB = await db.users.findOne({
            where: { email: body.email }
        });
        if (!userDB || !bcrypt.compareSync(body.password, userDB.password)) {
            return Response.bad_request(res, 'Incorrect username or password', []);
        }
        let token = jwt.sign({
            user: userDB
        }, process.env.JWT_SECRET_KEY, { expiresIn: Number(process.env.EXPIRATION_TIME) * 24 });
        return Response.success(res, 'User SignIn Succesfully', {
            ok: true,
            user: userDB,
            token
        });
    } catch (error) {
        return Response.error(res, `You can´t Sign in now`, []);
    }
}

async function signUp(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password, 10);
        let newUser = await db.users.create(data, { transaction });
        await transaction.commit();
        if (newUser) {
            return Response.success(res, 'User created succesfully', [], 201);
        } else {
            return Response.error(res, `User can´t created`, []);
        }
    } catch (error) {
        await transaction.rollback();
        if (error.name === 'SequelizeUniqueConstraintError') {
            return Response.bad_request(res, `User with email '${req.body.email}' exist now`);
        } else {
            return Response.error(res, `User can´t created`, []);
        }
    }
}

async function getOneUserById(id) {
    return await db.users.findOne({
        where: {
            id
        }
    });
}
module.exports = {
    login,
    signUp
}