
# Taproot Landing Page Merged

This variant combines the original light design with the dark palette as a user-facing theme toggle.

## Running the code

1. Run `npm install`
2. Set `VITE_CALENDLY_URL` in a local `.env` file if you want real booking links
3. Run `npm run dev`

## Calendly

The hero and demo CTAs open a shared booking modal backed by `VITE_CALENDLY_URL`.

Example:

```bash
VITE_CALENDLY_URL=https://calendly.com/rohan-taproot-ai/30min
```

## Vercel

This is a standard Vite static app, so it does not need rewrites for Vercel.

Recommended Vercel settings:

1. Root Directory: `Landing page merged`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variable: `VITE_CALENDLY_URL`
  
