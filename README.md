# ekis-site

Ek iş, part-time ve günlük işler için hazırlanmış demo / MVP site.

## Kurulum

```bash
npm install
npm run dev
```

## Environment Variables

`.env` dosyası oluştur:

```env
VITE_SUPABASE_URL=senin_supabase_url
VITE_SUPABASE_ANON_KEY=senin_publishable_key
```

## Vercel
Vercel'de şu environment variable'ları ekle:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`