"use strict";

import cartModel from "../models/cart.model.js";

const getCart = async (req, res) => {
    try {
        const { cart_num } = req.params;
        const foundCart = await cartModel.findOne({ cart_num: cart_num });
        if (!foundCart) {
          return res.status(404).json({ message: 'Table not found!' });
        }
        const result = {
          id: foundCart._id.toString(),
          table: foundCart.cart_num,
          food: foundCart.food_items,
          drink: foundCart.drink_items,
          status: foundCart.cart_status
        }
        res.status(200).json({ data: result, message: 'Table found!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const getCarts = async (req, res) => {
  try {
    const role = req.body.role;
    if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
    }
    if (role.role_type === 'admin') {
      const carts = await cartModel.find({},
        {
          cart_num: 1, food_items: 1, drink_items: 1, cart_status: 1, _id: 1
        });
      const result = carts.map(item => ({
        id: item._id.toString(),
        table: item.cart_num,
        food: item.food_items,
        drink: item.drink_items,
        status: item.cart_status
      }));
      res.status(200).send({
        data: result,
        message: "Tables retrieved successfully!"
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

const createCart = async (req, res) => {
    try {
        const cart = new cartModel(req.body.cart);
        await cart.save();
        const result = {
          id: cart._id.toString(),
          table: cart.cart_num,
          food: cart.food_items,
          drink: cart.drink_items,
          status: cart.cart_status
        }
        res.status(200).send({
          data: result,
          message: "Table created!"
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const editCart = async (req, res) => {
    try {
      const { id } = req.params; 
      const { update } = req.body;
      const updatedCart = await cartModel.findByIdAndUpdate(id, update, { new: true });
      if (!updatedCart) {
        return res.status(404).json({ message: 'Table not found!' });
      }
      const result = {
        id: updatedCart._id.toString(),
        table: updatedCart.cart_num,
        food: updatedCart.food_items,
        drink: updatedCart.drink_items,
        status: updatedCart.cart_status
      }
      res.status(200).json({ data: result, message: 'Table updated successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const deleteCart = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCart = await cartModel.findByIdAndRemove(id);
      const result = {
        id: deletedCart._id.toString(),
        table: deletedCart.cart_num,
        food: deletedCart.food_items,
        drink: deletedCart.drink_items,
        status: deletedCart.cart_status
      }
      res.status(200).json({ data: result, message: 'Table has been deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export default {
    getCart,
    getCarts,
    createCart,
    editCart,
    deleteCart
};