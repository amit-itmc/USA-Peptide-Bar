import { Router } from "express";
import { couponController } from "./coupon.controller.js";
import { authMiddleware } from "../../middlewares/auth.js";

const couponRouter = Router();

couponRouter.post("/validate", couponController.validateCoupon);

// Admin routes (assuming authMiddleware + role check handles admin, we just add them here)
couponRouter.get("/", authMiddleware, couponController.getAllCoupons);
couponRouter.post("/", authMiddleware, couponController.createCoupon);
couponRouter.put("/:id", authMiddleware, couponController.updateCoupon);
couponRouter.delete("/:id", authMiddleware, couponController.deleteCoupon);

export default couponRouter;
