import Jwt from "jsonwebtoken";
import "dotenv/config";

export const checkHeader = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authToken.split(" ")[1];

  try {
    Jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(401).json({ error: "Authentication required" });
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
};
