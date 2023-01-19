const jwt  = require("jsonwebtoken");
const {promisify} = require("util");

/**
  * check if token exists
  * if not token send res
  * decode the token
  * if valid then call next
 */

module.exports = async (req, res, next) => {
 
  try {
    const token  = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({
        status: 'error',
        error:"you are not login",
        message: 'Token not found', 
      });
    }

  const  decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

 
  req.user = decoded;

  next();

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      error: err.message,
      message: 'Invalid token',
    });
  }
}

 