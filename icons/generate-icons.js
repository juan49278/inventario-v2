// Script para generar iconos de PWA
// Ejecutar con: node public/icons/generate-icons.js

const fs = require('fs');
const path = require('path');

// Crear SVG base para el icono
const createIconSVG = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <rect width="${size * 0.5}" height="${size * 0.5}" rx="${size * 0.05}" fill="white" opacity="0.9"/>
    <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.3}" height="${size * 0.05}" fill="#3B82F6"/>
    <rect x="${size * 0.1}" y="${size * 0.2}" width="${size * 0.25}" height="${size * 0.05}" fill="#3B82F6"/>
    <rect x="${size * 0.1}" y="${size * 0.3}" width="${size * 0.35}" height="${size * 0.05}" fill="#3B82F6"/>
  </g>
</svg>
`;

// Tamaños de iconos necesarios
const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

console.log('🎨 Generando iconos para PWA...');

sizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(__dirname, filename);
  
  // Para este ejemplo, guardamos como SVG (en producción usarías una librería como sharp para convertir a PNG)
  const svgFilename = `icon-${size}x${size}.svg`;
  const svgFilepath = path.join(__dirname, svgFilename);
  
  fs.writeFileSync(svgFilepath, svg);
  console.log(`✅ Creado: ${svgFilename}`);
});

console.log(`
📱 Iconos generados exitosamente!

🔧 Para convertir SVG a PNG (recomendado):
1. Instala sharp: npm install sharp
2. Usa este script para convertir:

const sharp = require('sharp');
const fs = require('fs');

sizes.forEach(async (size) => {
  await sharp(\`icon-\${size}x\${size}.svg\`)
    .png()
    .resize(size, size)
    .toFile(\`icon-\${size}x\${size}.png\`);
});

📋 O usa herramientas online:
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/
- https://favicon.io/

🎯 Archivos necesarios creados:
${sizes.map(size => `- icon-${size}x${size}.svg`).join('\n')}
`);