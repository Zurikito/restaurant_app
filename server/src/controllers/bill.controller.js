"use strict";

import billModel from "../models/bill.model.js";

const getBill = async (req, res) => {
    try {
        const { bill_num } = req.params;
        const foundBill = await billModel.findOne({ bill_num: bill_num });
        if (!foundBill) {
            return res.status(404).json({ message: 'Bill not found!' });
        }
        const result = {
            id: foundBill._id.toString(),
            billID: foundBill.bill_id,
            table: foundBill.bill_num,
            food: foundBill.food_items,
            drink: foundBill.drink_items,
            total: foundBill.total
        }
        res.status(200).json({ data: result, message: 'Bill found!' });   
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBills = async (req, res) => {
    try {
      const role = req.body.role;
      if (!role || !role.role_type) {
        return res.status(403).send("User not authenticated!");
      }
      if (role.role_type === 'admin') {
        const bills = await billModel.find({}, {
          bill_id: 1, bill_num: 1, food_items: 1, drink_items: 1, total: 1, _id: 1
        });
        const result = bills.map(item => ({
          id: item._id.toString(),
          billID: item.bill_id,
          table: item.bill_num,
          food: item.food_items,
          drink: item.drink_items,
          total: item.total
        }));
        res.status(200).json({
          data: result,
          message: "Bills retrieved successfully!"
        });
      } else {
        res.status(403).send("Must be an admin to access!");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const createBill = async (req, res) => {
    try {
        const bill = new billModel(req.body.bill);
        await bill.save();
        const result = {
            id: bill._id.toString(),
            billID: bill.bill_id,
            table: bill.bill_num,
            food: bill.food_items,
            drink: bill.drink_items,
            total: bill.total
        }
        res.status(200).send({
            data: result,
            message: "Bill created!"
          });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default {
    getBill,
    getBills,
    createBill
};