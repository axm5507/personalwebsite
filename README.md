# Personal website

A dark, minimal personal site with a cursor proximity effect on the main page.

## Quick setup

### 1. About text (main page)

Edit **index.html**: find the section with class `about-content` and replace the placeholder paragraphs with your own. Each `<p>` with class `proximity-text` will get the proximity effect. You can add or remove paragraphs as you like.

### 2. Resume link

Edit **config.js** and set `window.RESUME_LINK` to your resume URL or path, for example:

- `"https://yoursite.com/resume.pdf"`
- `"resume.pdf"` (if the PDF is in the same folder as the site)

The Resume button in the nav will use this link on every page.

### 3. Contact page

Edit **contact.html** and update the email and social links in the `contact-list` with your real email, LinkedIn, GitHub, etc.

## Pages

- **index.html** — Home (about + proximity effect)
- **projects.html** — Projects (empty; add your projects later)
- **contact.html** — Contact links

## Run locally

Open **index.html** in a browser, or use a simple static server:

```bash
npx serve .
```

Then open the URL shown (e.g. http://localhost:3000).
