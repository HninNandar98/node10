var jwt = require("jsonwebtoken");

module.exports = function (req,res, next) {
    try {
        var token = req.headers.token;
        const decode = jwt.verify(token, "Techapi10");
        console.log(decode);
        next();
    } catch (error) {
        res.status(401).json({
            message : "Auth fail",
        });
    }
};