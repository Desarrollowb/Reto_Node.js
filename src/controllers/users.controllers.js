
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });


  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const validation = schema.validate({ username, password });


if (validation.error) {
  return res.status(400).json({ message: validation.error.details[0].message });
}


  
try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword });


  const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET);
  console.log('TOKEN ',process.env.JWT_SECRET)

  res.json({ token });
} catch (error) {
  return res.status(500).json({ message: error.message });
}
  
  };



export const loginUser = async (req, res) => {
  const { username, password } = req.body;


  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: 'Incorrect username or password' });


  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Incorrect username or password' });


  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  res.json({ token });


};


export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    req.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findByPk(id);

    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userToDelete.destroy();

    res.json({ message: 'User successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


