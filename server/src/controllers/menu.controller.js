"use strict";

import menuModel from "../models/menu.model.js";

const getItem = async (req, res) => {
    try {
      const { _id } = req.params;
      const foundItem = await menuModel.findById({ _id });
      if (!foundItem) {
        return res.status(404).json({ message: 'Item not found!' });
          }
          const result = {
            id: foundItem._id.toString(),
            name: foundItem.name,
            description: foundItem.des,
            imageURL: foundItem.img,
            price: foundItem.price,
            type: foundItem.type
        };
          res.status(200).json({ data: result, message: 'Item found!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMenu = async (req, res) => {
    try {
            const rs = await menuModel.find({}, 
                {
                    name: 1, 
                    des: 1,
                    img: 1,
                    price: 1,
                    _id: 1,
                    type: 1 });
            
            if (rs.length === 0) {
                return res.status(404).json({ message: 'No menu found!' });
            }

            const result = rs.map(menu => ({
                id: menu._id.toString(),
                name: menu.name,
                description: menu.des,
                imageURL: menu.img,
                price: menu.price,
                type: menu.type
            }));
              res.status(200).json({ data: result, message: 'Menu!' });   
        }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createItem = async (req, res) => {
    try {
      const role = req.body.role;
      if (!role || !role.role_type) {
        return res.status(403).send("User not authenticated!");
      }
      if (role.role_type === 'admin') {
            const item = new menuModel(req.body?.item);
            await item.save();
            const result = {
                id: item._id.toString(),
                name: item.name,
                description: item.des,
                imageURL: item.img,
                price: item.price,
                type: item.type
              }
              res.status(200).send({
                data: result,
                message: "Item created!"
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

const editItem = async (req, res) => {
    try {
      const role = req.body.role;
      if (!role || !role.role_type) {
        return res.status(403).send("User not authenticated!");
      }
      if (role.role_type === 'admin') {
        const { _id } = req.params;
        const { update } = req.body;
        const updatedItem = await menuModel.findByIdAndUpdate(_id, update, { new: true });
        if (!updatedItem) {
          return res.status(404).json({ message: 'Item is not found!' });
        }
        const result = {
            id: updatedItem._id.toString(),
            name: updatedItem.name,
            description: updatedItem.des,
            imageURL: updatedItem.img,
            price: updatedItem.price,
            type: updatedItem.type
        }
        res.status(200).json({ data: result, message: 'Item is updated successfully!' });
      } else {
        res.status(403).send("Must be an admin to access!");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
      const role = req.body.role;
      if (!role || !role.role_type) {
      return res.status(403).send("User not authenticated!");
      }
      if (role.role_type === 'admin') {
        const { _id } = req.params;
        const deletedItem = await menuModel.findByIdAndRemove(_id);
        const result = {
            id: deletedItem._id.toString(),
            name: deletedItem.name,
            description: deletedItem.des,
            imageURL: deletedItem.img,
            price: deletedItem.price,
            type: deletedItem.type
        }
        res.status(200).json({ data: result, message: 'Item has been deleted successfully!' });
    } else {
      res.status(403).send("Must be an admin to access!");
    }
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

export default {
    getItem,
    getMenu,
    createItem,
    editItem,
    deleteItem
};