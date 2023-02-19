const jwt = require('jsonwebtoken');



let authenticator = (req, res, next) => {

        if (req.headers.token) {
            jwt.verify(req.headers.token, 'shhhhh', function (err, decoded) {
                if (decoded) {
                    req.body.userid=decoded.userid
                    next()
                }
                else {
                    res.send(err)
                }
            });
        }
        else {
            res.send("First Login")
        }
}

module.exports = { authenticator }