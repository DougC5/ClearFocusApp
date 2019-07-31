const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
try {

const token = req.headers.authorization.split(" ")[1];

const decodedToken = jwt.verify(token, "greedy_briber_and_chunky_composer_unveil_1991_polluted_toilets_and_2016_boiling_lambs_in_Perth");
req.userData = {email: decodedToken.email, userId: decodedToken.userId};
next();

} catch (error) {
    res.status(401).json({message: "Auth failed!"});
}

};