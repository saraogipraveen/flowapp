const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let authorization = req.get("Authorization");

        if (authorization) {
            let token = authorization.split(" ")[1];

            if (!token || token === "") {
                req.isAuth = false;
                next();
            }

            let decodedToken = await jwt.verify(token, process.env.AUTHORIZATION_TOKEN);

            if (!decodedToken) {
                req.isAuth = false;
                next();
            }

            req.isAuth = true;
            req.userId = decodedToken.userId;
            next();
        }
        else {

            return res.status(400).json({message :'Unauthorized access detected'})
        }


    } catch (error) {
        console.log(error);
        next();
    }
};
