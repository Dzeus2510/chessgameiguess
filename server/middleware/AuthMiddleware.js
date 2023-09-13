const { verify } = require("jsonwebtoken"); 

const validateToken = (req, res, next) => {
  const accessToken = req.get("AccessToken");

  if (!req.header("accessToken")) {
    return res.json({ error: "User not logged in!" });
  } 
    try {
        const validToken = verify(accessToken, "important");
        req.user = validToken;
        if (validToken) {
          return next();
        }
      } catch (err) {
        return res.json({ error: err });
    };
  }

  

module.exports = { validateToken };