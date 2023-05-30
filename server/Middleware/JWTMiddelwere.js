const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    const jwttoken = req.header("x-token");
    console.log(jwttoken);
    if (!jwttoken) {
      res.status(401).send("JWT token not found");
      return;
    }

    jwt.verify(jwttoken, process.env.SECRET_KEY, (err, user_exists) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(404).send("JWT token has expired.");
          return res.end();
        } else {
          res.status(404).send("Invalid JWT token.");
          return res.end();
        }
      }
      console.log(user_exists);
      req.user = user_exists;
      next();
    });
  } catch (error) {
    if (error) throw error;
    res.status(400).send("Error on the middleware");
  }
};

module.exports = jwtMiddleware;
