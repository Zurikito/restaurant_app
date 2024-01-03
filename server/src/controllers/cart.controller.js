"use strict";

import cartModel from "../models/cart.model.js";
import menuModel from "../models/menu.model.js";

const getCart = async (req, res) => {
  try {
    const rs = await cartModel.find();
    if (!rs || rs.length === 0) {
      return res.status(404).json({ message: 'No items found in the cart!' });
    }
    
    const items = await Promise.all(rs.map(async (element) => {
      try {
        const tmp = await menuModel.findById(element.item_id);
        if (!tmp) {
          return null; // Handle if item not found
        }
        
        const item = {
          id: element._id.toString(),
          menu_id: tmp._id.toString(),
          name: tmp.name,
          description: tmp.des, // Consider renaming this to 'description' or 'description' in your model.
          imageURL: tmp.img,
          price: tmp.price,
          type: tmp.type,
          quantity: element.quantity
        };
        return item;
      } catch (error) {
        return null; // Handle any errors during item retrieval
      }
    }));

    // Filter out null items (items not found)
    const validItems = items.filter(item => item !== null);

    if (validItems.length === 0) {
      return res.status(404).json({ message: 'No valid items found!' });
    }

    res.status(200).json({ data: validItems, message: 'Records found!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const test = async(req, res) => {
  console.log("test done")
  res.status(200).json({ message: "test done" });
}

const getCartByTableId = async (req, res) => {
  try {
    // Extract the id parameter from the request
    const { id } = req.params;
    console.log("req",  req.params)
    // Use the id parameter to find the cart items for the specific table
    const rs = await cartModel.find({ table_id: id });

    if (!rs || rs.length === 0) {
      return res.status(404).json({ message: 'No items found in the cart!' });
    }

    const items = await Promise.all(rs.map(async (element) => {
      try {
        const tmp = await menuModel.findById(element.item_id);
        if (!tmp) {
          return null; // Handle if item not found
        }

        const item = {
          id: element._id.toString(),
          menu_id: tmp._id.toString(),
          name: tmp.name,
          description: tmp.des, // Consider renaming this to 'description' or 'description' in your model.
          imageURL: tmp.img,
          price: tmp.price,
          type: tmp.type,
          quantity: element.quantity
        };
        return item;
      } catch (error) {
        return null; // Handle any errors during item retrieval
      }
    }));

    // Filter out null items (items not found)
    const validItems = items.filter(item => item !== null);

    if (validItems.length === 0) {
      return res.status(404).json({ message: 'No valid items found!' });
    }

    res.status(200).json({ data: validItems, message: 'Records found!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCart = async (req, res) => {
  try {
    console.log("cart" , req.body)
    const cart = new cartModel(req.body.cart);
    await cart.save();
    res.status(200).send({
      data: null,
      message: "Record created!"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { cart } = req.body.cart;
    const updatedCart = await cartModel.findByIdAndUpdate(id, cart, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Record not found!' });
    }
    res.status(200).json({ data: null, message: 'Record updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await cartModel.findByIdAndRemove(id);
    res.status(200).json({ data: null, message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export default {
  getCart,
  createCart,
  editCart,
  deleteCart, 
  getCartByTableId, 
  test
};