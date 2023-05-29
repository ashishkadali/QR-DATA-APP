const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    const jwttoken = req.header("x-token");
    console.log(jwttoken);
    if (!jwttoken) {
      res.status(401).send("JWT token not found");
      return;
    }

    const user_exists = jwt.verify(jwttoken, process.env.SECRET_KEY);
    console.log(user_exists);
    req.user = user_exists;
    next();
  } catch (error) {
    if (error) throw error;
    res.status(400).send("Error on the middleware");
  }
};

module.exports = jwtMiddleware;
