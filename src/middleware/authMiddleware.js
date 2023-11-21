

import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ message: 'Unauthorized access' });
  } 
  

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
return res.status(403).json({ message: 'Invalid Token' });
    } 

    
    req.user = await User.findByPk(user.id);
    next();
  });
};




export default authenticateToken;




