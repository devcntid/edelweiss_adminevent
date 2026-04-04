export interface Setting {
  id: number;
  key: string;
  value: string | null;
  type: SettingType;
  category: SettingCategory;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type SettingType = 'string' | 'color' | 'file' | 'boolean' | 'number';

export type SettingCategory =
  | 'branding'
  | 'appearance'
  | 'general'
  | 'public';

export interface SettingInput {
  key: string;
  value?: string | null;
  type?: SettingType;
  category: SettingCategory;
  description?: string | null;
}

export interface SettingUpdate {
  key: string;
  value: string;
}

export interface DynamicSettings {
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  appName: string;
  appDescription: string;
}

/** Branding khusus halaman login (server + client) */
export type LoginBranding = {
  logo: string;
  loginBackground: string;
  appName: string;
  favicon: string;
};

export interface SettingsResponse {
  success: boolean;
  data?: Setting | Setting[];
  error?: string;
}

export interface UploadResponse {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
}

/** Judul aplikasi (tab browser, dsb.) jika `app_name` di database kosong */
export const FALLBACK_APP_TITLE = 'Admin Panel';

// Predefined setting keys
export const SETTING_KEYS = {
  // Branding
  APP_LOGO: 'app_logo',
  APP_FAVICON: 'app_favicon',
  APP_LOGIN_BACKGROUND: 'app_login_background',

  // Appearance
  SIDEBAR_PRIMARY_COLOR: 'sidebar_primary_color',
  SIDEBAR_SECONDARY_COLOR: 'sidebar_secondary_color',

  // General
  APP_NAME: 'app_name',
  APP_DESCRIPTION: 'app_description',

  /** Metadata untuk aplikasi / situs publik (bukan panel admin) */
  LOGO_PUBLIC_APP: 'logo_public_app',
  FAVICON_PUBLIC_APP: 'favicon_public_app',
  TITLE_PUBLIC_APP: 'title_public_app',
} as const;

// Default values
export const DEFAULT_SETTINGS: Record<string, string> = {
  [SETTING_KEYS.APP_LOGO]: '/logo-main-new.png',
  [SETTING_KEYS.APP_FAVICON]: '/favicon.png',
  [SETTING_KEYS.APP_LOGIN_BACKGROUND]:
    'https://tguray8zidjbrs4r.public.blob.vercel-storage.com/logo/bg.png',
  [SETTING_KEYS.SIDEBAR_PRIMARY_COLOR]: '#9333ea',
  [SETTING_KEYS.SIDEBAR_SECONDARY_COLOR]: '#7c3aed',
  // Dibiarkan generic; nilai sebenarnya diambil dari database (tabel settings)
  [SETTING_KEYS.APP_NAME]: '',
  [SETTING_KEYS.APP_DESCRIPTION]: '',
  [SETTING_KEYS.LOGO_PUBLIC_APP]: '/logo-main-new.png',
  [SETTING_KEYS.FAVICON_PUBLIC_APP]: '/favicon.png',
  [SETTING_KEYS.TITLE_PUBLIC_APP]: '',
};
