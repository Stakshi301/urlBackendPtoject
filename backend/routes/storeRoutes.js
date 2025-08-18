import express from "express";
import { listStores, storeRatings } from "../controller/storeController.js";
import { submitRating } from "../controller/ratingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listStores);
router.get("/:id/ratings", protect, storeRatings);
router.post("/:id/rating", protect, authorize("user"), submitRating);

export default router;
 