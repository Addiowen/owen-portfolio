# Owen Oscar — Personal Portfolio

A modern, performant personal portfolio built with **Angular 21** and **Tailwind CSS**, featuring a full light/dark mode toggle, smooth animations, and a clean responsive layout.

🌐 **Live:** [your-portfolio-url.com](https://your-portfolio-url.com)

---

## ✨ Features

- **Light & Dark Mode** — System preference detection with manual toggle and `localStorage` persistence
- **Responsive Design** — Mobile-first layout that works across all screen sizes
- **Smooth Animations** — Fade-in-up reveals, floating elements, role ticker, and blob effects
- **Contact Form** — Integrated with EmailJS for direct message delivery
- **CV Download** — One-click PDF download
- **Back to Top** — Floating button that appears on scroll
- **Hire Me Modal** — Quick-view card with stats, offerings, and CTAs

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components, signals) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Icons | Angular Material Icons |
| Email | EmailJS |
| Build | Angular CLI + Vite |
| Language | TypeScript |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/        # Navigation, theme toggle, hire me modal, back-to-top
│   │   ├── hero/          # Landing section with role ticker and stats
│   │   ├── about/         # Bio, facts grid, CV download
│   │   ├── skills/        # Filterable skill cards with progress bars
│   │   ├── projects/      # Filterable project cards with live/code links
│   │   ├── experience/    # Interactive timeline + education + certifications
│   │   ├── contact/       # Contact links + EmailJS form
│   │   └── footer/        # Links, socials, availability
│   ├── app.ts             # Root component
│   ├── app.config.ts      # App configuration
│   └── app.routes.ts      # Routes
├── styles.css             # Global styles, CSS variables, theme tokens
└── index.html
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Addiowen/angular-portfolio.git
cd angular-portfolio

# Install dependencies
npm install

# Start dev server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🎨 Theming

The theme system uses CSS custom properties that swap on the `.dark` class applied to `<html>`:

```css
/* Light mode */
:root {
  --color-ink:         #0a0a0f;   /* primary text */
  --color-paper:       #f5f0e8;   /* page background */
  --color-surface:     #ffffff;   /* cards & forms */
  --color-surface-alt: #f0ebe0;   /* alternate sections */
  --color-accent:      #c8a96e;   /* gold highlight */
  --color-accent2:     #7c6bc4;   /* purple highlight */
}

/* Dark mode */
.dark {
  --color-ink:         #f0ece4;
  --color-paper:       #0d0d14;
  --color-surface:     #16161f;
  --color-surface-alt: #111118;
  --color-accent:      #d4b87a;
  --color-accent2:     #9d8fe8;
}
```

---

## 📧 Email Setup

The contact form uses [EmailJS](https://www.emailjs.com/). To activate it:

1. Create a free account at emailjs.com
2. Add an email service and a message template
3. Replace the placeholder values in `contact.ts`:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { ... },
  'YOUR_PUBLIC_KEY'
);
```

---

## 🏗️ Build for Production

```bash
ng build
```

Output goes to `dist/`. Deploy the contents of that folder to any static host (Vercel, Netlify, GitHub Pages, Firebase Hosting, etc.).

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/portfolio/browser
```

---

## 🧪 Running Tests

```bash
# Unit tests
ng test

# End-to-end tests
ng e2e
```

---

## 📄 License

MIT — feel free to use this as a base for your own portfolio. A credit back to the original is appreciated but not required.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Addiowen">Owen Oscar</a> · Nairobi, Kenya
</div>