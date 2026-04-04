import { SettingsService } from "@/lib/database";
import {
  DEFAULT_SETTINGS,
  FALLBACK_APP_TITLE,
  SETTING_KEYS,
  type LoginBranding,
} from "@/types/settings";

export function getDefaultLoginBranding(): LoginBranding {
  return {
    logo: DEFAULT_SETTINGS[SETTING_KEYS.APP_LOGO],
    loginBackground: DEFAULT_SETTINGS[SETTING_KEYS.APP_LOGIN_BACKGROUND],
    appName: FALLBACK_APP_TITLE,
    favicon: DEFAULT_SETTINGS[SETTING_KEYS.APP_FAVICON],
  };
}

/**
 * Branding untuk halaman login — selalu baca per key agar konsisten dengan baris DB Anda.
 */
export async function getLoginBranding(): Promise<LoginBranding> {
  const defaults = getDefaultLoginBranding();
  try {
    const [logoRow, bgRow, nameRow, faviconRow] = await Promise.all([
      SettingsService.getByKey(SETTING_KEYS.APP_LOGO),
      SettingsService.getByKey(SETTING_KEYS.APP_LOGIN_BACKGROUND),
      SettingsService.getByKey(SETTING_KEYS.APP_NAME),
      SettingsService.getByKey(SETTING_KEYS.APP_FAVICON),
    ]);

    const logo = logoRow?.value?.trim();
    const bg = bgRow?.value?.trim();
    const name = nameRow?.value?.trim();
    const favicon = faviconRow?.value?.trim();

    return {
      logo: logo || defaults.logo,
      loginBackground: bg || defaults.loginBackground,
      appName: name || defaults.appName,
      favicon: favicon || defaults.favicon,
    };
  } catch {
    return defaults;
  }
}
