import type { Request, Response } from "express";
import { couponService } from "./coupon.service.js";
import { responseHandler } from "../../utils/response.js";

export const couponController = {
  async validateCoupon(req: Request, res: Response): Promise<void> {
    try {
      const { code, orderAmount } = req.body;
      
      if (!code) {
        responseHandler.badRequest(res, "Coupon code is required");
        return;
      }

      const coupon = await couponService.validateCoupon(code, Number(orderAmount));
      
      responseHandler.ok(res, "Promo code applied successfully", coupon);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to validate promo code";
      responseHandler.badRequest(res, message);
    }
  },

  async getAllCoupons(req: Request, res: Response): Promise<void> {
    try {
      const coupons = await couponService.getAllCoupons();
      responseHandler.ok(res, "Coupons retrieved successfully", coupons);
    } catch (error) {
      responseHandler.serverError(res, "Failed to retrieve coupons");
    }
  },

  async createCoupon(req: Request, res: Response): Promise<void> {
    try {
      const coupon = await couponService.createCoupon(req.body);
      responseHandler.created(res, "Coupon created successfully", coupon);
    } catch (error) {
      responseHandler.serverError(res, "Failed to create coupon");
    }
  },

  async updateCoupon(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const coupon = await couponService.updateCoupon(Number(id), req.body);
      responseHandler.ok(res, "Coupon updated successfully", coupon);
    } catch (error) {
      responseHandler.serverError(res, "Failed to update coupon");
    }
  },

  async deleteCoupon(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await couponService.deleteCoupon(Number(id));
      responseHandler.ok(res, "Coupon deleted successfully");
    } catch (error) {
      responseHandler.serverError(res, "Failed to delete coupon");
    }
  }
};
