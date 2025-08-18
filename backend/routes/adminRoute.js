    import express from "express";
    import { addUser, addStore, dashboardStats } from "../controller/adminController.js";
    import { protect, authorize } from "../middleware/authMiddleware.js";

    const router = express.Router();

    router.post("/user", protect, authorize("admin"), addUser);
    router.post("/store", protect, authorize("admin"), addStore);
    router.get("/dashboard", protect, authorize("admin"), dashboardStats);

    export default router;
