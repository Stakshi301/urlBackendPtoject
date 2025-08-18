import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

ratingSchema.index({ user: 1, store: 1 }, { unique: true });

export default mongoose.model("Rating", ratingSchema);
