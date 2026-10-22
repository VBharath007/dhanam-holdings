# Danam Holdings — redesigned website

A complete static website using the supplied Inter typography, brand logo, business data and imagery.

## Run
- **Development Server (recommended)**: Run `npm install` and `npm run dev`. Open http://localhost:5173.
- **Static HTTP Server**: Serve `dist` from any static HTTP server (e.g., `python -m http.server 8080 --directory dist`). Open http://localhost:8080.

## Edit
- `dist/data.js`: business data, services, projects, gallery paths, team, FAQs and sample testimonials.
- `dist/app.js`: page layouts and interactions.
- `dist/style.css`: responsive design and motion.
- `dist/index.html`: document metadata.
- Other files in dist: original supplied assets.

The 16 inner route directories contain the shared HTML entry for direct navigation on static hosts. When modifying the HTML head, update their index.html copies too. The root application chooses content by URL.

## Included
Home, About, Services, Projects, Contact, 12 project detail routes; 108 project gallery images; project categories; keyboard/swipe gallery; mobile navigation; reduced-motion support; service and FAQ accordions; WhatsApp enquiry with native validation.

## Content notes
Sample testimonials are retained and explicitly labelled unverified, matching the original source's warning. Business claims, classifications and project status are retained as supplied. No project areas or completion dates were invented. Six broken service image references in the original data were repaired against the supplied filenames.

The enquiry form opens a WhatsApp draft. It does not send messages automatically and has no server-side submission database. Google Fonts and Google Maps require external network access.
