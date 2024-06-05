const User = require('../models/user');

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json(newUser);
};

exports.getUsers = async (req, res) => {
  const users = await User.find().populate('links');
  res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate('links');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
};
