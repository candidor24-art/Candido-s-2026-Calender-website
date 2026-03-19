# Calendar Website

This is a simple static website that shows a calendar for each month of the year. The site includes **12 separate pages** (one per month), and each page includes the same sidebar list of month links.

## How it works

- `docs/index.html` is the home page and shows the month list.
- Each month has its own page under `docs/` (e.g., `docs/january.html`).
- `docs/js/calendar.js` renders a calendar table for the selected month.

## Run

### Option A (recommended): run a local server
From the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000/docs/index.html
```

### Option B: open directly
Open `docs/index.html` in your browser.

## Sources consulted

- MDN Web Docs (HTML, CSS, JavaScript)
- GitHub Pages documentation
