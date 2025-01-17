const jwt = require("jsonwebtoken");

const { User } = require("../models/user-schema");

const { HttpError } = require("../helpers");

const { ACCESS_SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    console.log('authenticate middleware called');
    const { authorization = " " } = req.headers;
    console.log('authorization', authorization)
    const [bearer, token] = authorization.split(" ");
    console.log("token", token);
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
        console.log('id', id);
        const user = await User.findById(id);
        console.log('user Token',user.accessToken);
        if (!user || user.accessToken!==token) {
            next(HttpError(401));
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401));
    }
}

module.exports = authenticate;