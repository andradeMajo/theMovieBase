const jwt = require("jsonwebtoken");
const User = require("../model/User");

const requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        else {
          const { id } = decodedToken;
          const user = await User.findById(id);  
          if (!user) return res.status(401).json({ error: 'Unauthorized' });
          req.user= user
          next()
        }
      });

    }
  }else  return res.status(401).json({ error: 'hola' });


}
module.exports = requireAuth