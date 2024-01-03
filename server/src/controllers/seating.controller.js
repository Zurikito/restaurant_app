"use strict";
import { Seating } from '../../server.js';
import seatingModel from "../models/seating.model.js";


const getAllSeating = async (req, res) => {
  try {

    const allSeating = await Seating.find();
    if (allSeating.length === 0) {
      return res.status(404).json({ message: 'No valid items found!' });
    }
    res.status(200).json({ data: allSeating, message: 'Find Success!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createTable = async (req, res) => {
  try {
    const { num } = req.body.table; // Lấy giá trị num từ req.body.table
    if (!num) {
      return res.status(400).send("Table number is required!");
    }

    const table = new seatingModel({ num }); // Tạo bảng với giá trị num
    await table.save();

    const result = {
      number: Number(table.num)
    };

    res.status(200).send({
      data: result,
      message: "Table created!"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTable = async (req, res) => {
  // try {

  const { _id } = req.params;
const foundItem = await Seating.findById(_id);
if (foundItem) {
  console.log('Item found:', foundItem);
  res.status(200).json({ data: foundItem, message: 'Item found!' });
} else {
  res.status(404).json({ message: 'Item not found!' });
}
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};



export default {
  getAllSeating,
  createTable,
  deleteTable
}