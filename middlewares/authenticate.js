const jwt = require("jsonwebtoken");

const { User } = require("../models/user-schema");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

console.log(SECRET_KEY);

const authenticate = async (req, res, next) => {
    const { authorization = " " } = req.headers;
    console.log(authorization)
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        console.log(id);
        const user = await User.findById(id);
        console.log('user Token',user.token);
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