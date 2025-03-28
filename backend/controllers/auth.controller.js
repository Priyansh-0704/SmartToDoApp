import  User  from '../models/user.models.js';
import bcrypt from 'bcrypt';

export async function signup(req, res) {
 try {
   const { username, password, name, email } = req.body;
   if(!username || !password || !name || !email) {
     return res.status(400).json({ message: 'All fields are required' });
   }
   if (password.length < 6) {
     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
   }
   const userExists = await User.findOne({ $or: [{ username }, { email }] });
   if (userExists) {
     return res.status(400).json({ message: 'User already exists' });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({ username, password: hashedPassword, name, email });
    const savedUser = await user.save();
    if (savedUser) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
 }
 } catch (error) {
    res.status(500).json({ message: error.message });
  
 }
}

export async function login(req, res) {
    res.send('Login');
}

export async function logout(req, res) {
    res.send('Logout');
}