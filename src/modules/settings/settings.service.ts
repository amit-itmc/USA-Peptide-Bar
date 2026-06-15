import { db } from "../../db/knex.js";

// Fetch all settings
export const getAllSettings = async () => {
  const settings = await db("site_settings").select("setting_key", "setting_value");
  
  // Convert array of objects [{ setting_key: 'email', setting_value: 'info@...' }]
  // to a single object { email: 'info@...' }
  const settingsObj: Record<string, string> = {};
  settings.forEach((setting) => {
    settingsObj[setting.setting_key] = setting.setting_value || "";
  });
  
  return settingsObj;
};

// Update multiple settings at once
export const updateSettings = async (settingsData: Record<string, string>) => {
  const keys = Object.keys(settingsData);
  
  for (const key of keys) {
    const value = settingsData[key];
    
    // Check if setting exists
    const existing = await db("site_settings").where({ setting_key: key }).first();
    
    if (existing) {
      await db("site_settings")
        .where({ setting_key: key })
        .update({ setting_value: value, updated_at: db.fn.now() });
    } else {
      await db("site_settings").insert({
        setting_key: key,
        setting_value: value
      });
    }
  }
  
  return true;
};
