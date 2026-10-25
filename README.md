# Operation: Cupid Chaos — React Edition 💘

A dynamic, responsive prank game built with React + Vite. Features include interactive quiz choices, a mischievous YES/NO button moment, mystery gifts, tap-to-complete missions, a fake terminal glitch, a romantic ending, editable ending text, confetti, floating decorations, and an optional tiny synthesized melody.

## Run locally

You need Node.js installed (LTS version recommended).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Customize the ending

Open `src/App.jsx` and edit:
- `DEFAULT_LETTER` for the final love note.
- `QUESTIONS` for quiz prompts and responses.
- `GIFTS` for the mystery gift reveals.
- `MISSIONS` for the mini objectives.

The final screen also has a **Personalize ending** panel so you can preview a custom name, signature, and note in the browser. To permanently include the changes for everyone who visits the deployed site, update `DEFAULT_LETTER` and rebuild.

## Free deployment: GitHub Pages

The simplest free option for a Vite app is GitHub Pages with GitHub Actions:

1. Create a GitHub repository and upload the project files (do not upload `node_modules`).
2. In `vite.config.js`, set `base` to `'/YOUR-REPOSITORY-NAME/'` (the project includes a starter config for this).
3. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Add the included workflow file `.github/workflows/deploy.yml` to the repository if it is not already present.
5. Push to the `main` branch. GitHub Actions will build and publish the site.
6. Copy the URL shown under Settings → Pages and send it to your partner.

### Alternative: Netlify

1. Run `npm run build`.
2. Visit https://app.netlify.com/drop and drag the `dist` folder into the drop area.
3. Share the URL Netlify provides.

## Notes

- No backend, login, database, or paid API is required.
- The optional melody is generated in-browser with Web Audio; it is not a music file.
- The NO button prank is playful and does not lock the browser or prevent leaving the website.
- The Google Fonts import is optional; system fonts are used as fallbacks.


## Personalized edition: Naseeha 💗

This version is customized for **Naseeha** from **zawjii**, with the nickname **habibi**, the inside joke **ulaga alagi**, playful prank dialogue, and a romantic ending including **fi dunya wal aakhirat, Insha'Allah**.

### Run it locally
1. Install Node.js (LTS) if it is not installed.
2. Open a terminal in this project folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

### Change the built-in love note
Edit `DEFAULT_LETTER` near the top of `src/App.jsx`. The ending also has a **Personalize ending** panel for quick session-only edits.


### Cute sounds and dramatic reveals
- Button sounds and reveal chimes are synthesized in the browser with Web Audio, so there are no external audio files to download.
- Use the speaker button in the top bar to mute/unmute button and reveal sounds. The music-note button controls the optional melody.
- Page changes trigger a full-screen heart-and-sparkle burst. Reduced-motion preferences are respected.
- Quiz choices influence the playful, soft, or secret route, including route-specific gift reveals and missions.


### Gift reveal pacing update
- Full-screen page transitions now last about 1.85 seconds, with a slower heart burst and title pop.
- Opening a gift launches a dramatic modal with its own heart/sparkle burst and bounce animation.
- Gift reveal modals do not auto-dismiss. The player must press **Open next gift** or, after all three gifts are opened, **Continue to secret missions**.

## Classical piano soundtrack

Background music now uses real piano MP3 recordings instead of Web Audio synthesized notes. The music changes when the selected main path changes:

- Scientific Research: Beethoven — Für Elise
- Top-Secret Operation: Beethoven — Moonlight Sonata, Movement I
- Romantic Drama: Erik Satie — Gymnopédie No. 1
- Royal Ceremony: Erik Satie — Gymnopédie No. 3

The recordings are streamed from A-M Classical. A-M Classical states its original audio content is available under a Creative Commons Attribution licence. Keep attribution and review the source terms before redistributing or publishing. Source: https://amclassical.com/piano/

Playback requires an internet connection and a user click due to browser autoplay restrictions. The site loops the selected recording and changes tracks when the main path changes. If a recording fails to load, use the music button to retry after checking connectivity.

## Path-specific mini-games update
The 16 secondary paths now dispatch to 16 different challenge mechanics (formula mixing, memory matching, pattern recall, arithmetic balancing, randomized digit lock, symbol spotting, randomized Caesar decoding, checksum verification, token collection, evidence selection, word ordering, heart-meter balancing, reaction tapping, decree ordering, randomized treasure grid, and a logic riddle). The random puzzle data is created on each entry to the mini-game, so replaying a path generates a new challenge pattern/answer.

Keep the four piano recordings in `public/music/` using the exact filenames listed in `public/music/README.txt`. Audio files are not bundled in this source archive.
