const jwt = require("jsonwebtoken");

const { User } = require("../models/user-schema");

const { HttpError } = require("../helpers");

const { ACCESS_SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    const { authorization = " " } = req.headers;
    console.log(authorization)
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
        console.log(id);
        const user = await User.findById(id);
        console.log('user Token',user.accessToken);
        if (!user || !user.token) {
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