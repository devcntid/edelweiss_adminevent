INSERT INTO settings (key, value, type, category, description)
VALUES (
  'app_login_background',
  'https://tguray8zidjbrs4r.public.blob.vercel-storage.com/logo/bg.png',
  'file',
  'branding',
  'Login page background image'
)
ON CONFLICT (key) DO NOTHING;
