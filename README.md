Farcaster Endless Runner Lite (Fixed)
======================================

This package fixes known Kaboom v3000+ compatibility issues:
- uses setGravity(...) (gravity() removed)
- uses anchor(...) instead of origin()
- replaces solid() with body({ isStatic: true }) for static floor
- obstacles use area() + move() (no body) for reliable collision handling

Files:
- index.html
- style.css
- game.js  (fixed)
- farcaster-integration.js (share/post placeholders)
- README.md
- manifest.json
- icon-192.png

How to run:
1. Extract the ZIP.
2. Open index.html in a modern browser to play immediately.
3. To deploy, upload the files to any static host (Vercel: Framework = Other, Output Dir = .).

Want actual Farcaster posting?
- I can add a serverless function (Vercel/Netlify) and example Neynar code to post signed casts. Tell me which host and I'll generate it.
