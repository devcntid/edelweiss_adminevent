INSERT INTO settings (key, value, type, category, description)
VALUES
  (
    'logo_public_app',
    '/logo-main-new.png',
    'file',
    'public',
    'Logo aplikasi publik (situs / app pengunjung)'
  ),
  (
    'favicon_public_app',
    '/favicon.png',
    'file',
    'public',
    'Favicon aplikasi publik'
  ),
  (
    'title_public_app',
    '',
    'string',
    'public',
    'Judul (title) aplikasi publik — tab browser & metadata'
  )
ON CONFLICT (key) DO NOTHING;
