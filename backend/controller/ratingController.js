import Rating from "../model/Rating.js";

export const submitRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const storeId = req.params.id;
    const existing = await Rating.findOne({ user: req.user._id, store: storeId });
if (typeof rating !== "number" || rating < 1 || rating > 5) {
  return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
}

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }

    const newRating = await Rating.create({ user: req.user._id, store: storeId, rating });
    res.json(newRating);
  } catch (error) {
      console.log(error.message);
    res.status(500).json({ message: error.message });
  } 
};
