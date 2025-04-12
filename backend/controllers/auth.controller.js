import  User  from '../models/user.models.js';
import bcrypt from 'bcrypt';

export async function signup(req, res) {
  try {
    const { username, password, name, email } = req.body;

    if (!username || !password || !name || !email) {
      return res.status(400).json({ status: "fail", message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ status: "fail", message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(200).json({ status: "fail", message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, name, email });
    const savedUser = await user.save();

    if (savedUser) {
      return res.status(201).json({ status: "success", message: 'User created successfully' });
    } else {
      return res.status(400).json({ status: "fail", message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: "fail", message: 'Username and password are required' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(200).json({ status: "fail", message: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(200).json({ status: "fail", message: 'Invalid username or password' });
  }

  res.status(200).json({
    status: "success",
    message: 'Logged in successfully',
    others: {
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name
    }
  });
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
