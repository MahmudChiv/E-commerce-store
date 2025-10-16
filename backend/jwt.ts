// generate_jwt.js
import jwt from "jsonwebtoken"

const payload = {
  user_id: 456,
  username: 'anotheruser'
};

const secret = 'your_super_secret_key'; // Replace with a strong secret
const options = {
  expiresIn: '1h' // Token expires in 1 hour
};

const token = jwt.sign(payload, secret, options);
console.log(token);