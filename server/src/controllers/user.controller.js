"use strict";

import userModel from "../models/user.model.js";

const getUsers = async (req, res) => {
  try { 
    const role = req.body.role;
    if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
    }
    if (role.role_type === 'admin') {
      const users = await userModel.find({}, 
        { user_id: 1, user_type: 1, _id: 1 });
      const result = users.map(item => ({ 
        id: item._id.toString(),
        username: item.user_id,
        role: item.user_type
      }));
      res.status(200).send({
        data: result,
        message: 'Data retrieved successfully!'
      });
    } else {
      res.status(403).send(
      "Must be an admin to access!"
      );
  }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
    }
    if (role.role_type === 'admin') {
      const user = new userModel(req.body?.user);
      await user.save();
      const result = {
        id: user._id.toString(),
        username: user.user_id,
        role: user.user_type
      }
      res.status(200).send({
        data: result,
        message: "User created!"
      });
    } else {
        res.status(403).send(
        "Must be an admin to access!"
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
    }
    if (role.role_type === 'admin') {
      const { _id } = req.params;
      const { update } = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(_id, update, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User is not found!' });
      }
      const result = {
        id: updatedUser._id.toString(),
        username: updatedUser.user_id,
        role: updatedUser.user_type
      }
      res.status(200).json({ data: result, message: 'User is updated successfully!' });
    } else {
      res.status(403).send("Must be an admin to access!");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
    }
    if (role.role_type === 'admin') {
      const { _id } = req.params;
      const deletedUser = await userModel.findByIdAndRemove(_id);
      const result = {
        id: deletedUser._id.toString(),
        username: deletedUser.user_id,
        role: deletedUser.user_type
      }
      res.status(200).json({ data: result, message: 'User has been deleted successfully!' });
  } else {
    res.status(403).send("Must be an admin to access!");
  }
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const findUser = async (req, res) => {
  try {
      const { _id } = req.params;
      const foundUser = await userModel.findById({ _id });
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
      const result = {
        id: foundUser._id.toString(),
        username: foundUser.user_id,
        password: foundUser.user_password,
        role: foundUser.user_type
      }
      res.status(200).json({ data: result, message: 'User found!' });
    }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const user = req.body.user;
    const logging = await userModel.findOne({ user_id: user.user_id });

    if (!logging) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (logging.user_password !== user.user_password) {
      return res.status(404).json({ message: 'Password is incorrect' });
    }
    const result = {
      id: logging._id.toString(),
      username: logging.user_id,
      role: logging.user_type
    }
    res.status(200).json({ data: result, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getUsers,
  createUser,
  editUser,
  deleteUser,
  findUser,
  loginUser
};
