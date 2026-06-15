import { Request, Response } from "express";
import * as settingsService from "./settings.service.js";

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await settingsService.getAllSettings();
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settingsData = req.body;
    
    if (!settingsData || typeof settingsData !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid settings data provided",
      });
    }
    
    await settingsService.updateSettings(settingsData);
    
    // Return the updated settings
    const updatedSettings = await settingsService.getAllSettings();
    
    res.json({
      success: true,
      message: "Settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};
