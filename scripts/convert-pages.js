const fs = require('fs');
const path = require('path');

const pageMeta = {
  'index.html': { route: '', title: 'Leela Huts – Luxury Hotel & Resort', desc: 'Experience serenity, luxury, and nature at Leela Huts mountain resort.' },
  'about.html': { route: 'about', title: 'About Us | Leela Huts Hotel & Resort', desc: 'Learn more about Leela Huts, our history, ethos, and hospitality.' },
  'room.html': { route: 'room', title: 'Luxury Rooms & Suites | Leela Huts', desc: 'Choose from our collection of luxury chalets, suites, and mountain huts.' },
  'room-details.html': { route: 'room-details', title: 'Room Details | Leela Huts', desc: 'Explore room features, amenities, and booking details.' },
  'contact.html': { route: 'contact', title: 'Contact Us | Leela Huts Hotel & Resort', desc: 'Get in touch with Leela Huts for reservations, inquiries, and directions.' },
};

const linkMap = {
  'index.html': '/',
  'about.html': '/about',
  'room.html': '/room',
  'room-details.html': '/room-details',
  'contact.html': '/contact',
};

const startMarker = '<!--End Sidebar Cart Item -->';
const endMarker = '<!-- Start main footer Section -->';

for (const [file, meta] of Object.entries(pageMeta)) {
  if (!fs.existsSync(file)) {
    console.warn(`File ${file} does not exist, skipping.`);
    continue;
  }

  const raw = fs.readFileSync(file, 'utf8');
  let body = '';
  const sIdx = raw.indexOf(startMarker);
  const eIdx = raw.indexOf(endMarker);

  if (sIdx !== -1 && eIdx !== -1) {
    body = raw.substring(sIdx + startMarker.length, eIdx).trim();
  } else {
    console.warn(`Markers not found cleanly in ${file}`);
    continue;
  }

  // Replace links
  for (const [key, val] of Object.entries(linkMap)) {
    body = body.replaceAll(`"${key}"`, `"${val}"`).replaceAll(`'${key}'`, `'${val}'`);
  }

  // Replace asset paths to absolute /assets/
  body = body.replace(/(?<!\/)assets\//g, '/assets/');

  const pageContent = `export const metadata = {
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.desc)},
};

const htmlContent = ${JSON.stringify(body)};

export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
`;

  const targetDir = meta.route === '' ? path.join(__dirname, '..', 'app') : path.join(__dirname, '..', 'app', meta.route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'page.jsx'), pageContent, 'utf8');
  console.log(`Generated page for ${file} -> app/${meta.route ? meta.route + '/' : ''}page.jsx`);
}

console.log('All pages generated successfully.');
