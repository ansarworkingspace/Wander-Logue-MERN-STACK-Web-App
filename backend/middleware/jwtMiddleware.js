import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkJwt = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  if (!token) {
    // If no token is provided, redirect to login
    return res.redirect('/login');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request
    req.user = decoded;

    next(); // Move on to the next middleware or route handler
  } catch (error) {
    // If token verification fails, redirect to login
    return res.redirect('/login');
  }
};

export { checkJwt };
