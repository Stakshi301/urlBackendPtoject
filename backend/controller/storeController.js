import Store from "../model/store.js";
import Rating from "../model/Rating.js";

export const listStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (address) query.address = new RegExp(address, "i");

    const stores = await Store.find(query);
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const storeRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ store: req.params.id }).populate("user", "name email");
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length : 0;
    res.json({ ratings, avgRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
