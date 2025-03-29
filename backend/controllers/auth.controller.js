import  User  from '../models/user.models.js';
import jwt from 'jsonwebtoken'
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
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } 
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ message: 'Logged in successfully' });
}


export async function logout(req, res) {
    try {
      res.clearCookie('token')
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Internal server error' });
    }
}
