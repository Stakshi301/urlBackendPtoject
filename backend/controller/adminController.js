import User from "../model/userSchema.js";
import Store from "../model/store.js";
import Rating from "../model/Rating.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, role });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const addStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();
    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
}; 
