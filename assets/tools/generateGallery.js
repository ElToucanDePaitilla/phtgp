/**
 * generateGallery.js
 * node assets/tools/generateGallery.js
 * ------------------------------------------------
 * Parcourt assets/images/galeries/<cat>/*.{webp,jpg,jpeg,png,gif,avif}
 * et génère assets/data/galeries.json
 */

const fs   = require('fs');
const path = require('path');

// --- chemins absolus depuis la racine du projet ---
const projectRoot  = path.join(__dirname, '..', '..');      // remonte de assets/tools/ vers phtgp/
const galeriesRoot = path.join(projectRoot, 'assets', 'images', 'galeries');
const outputFile   = path.join(projectRoot, 'assets', 'data', 'galeries.json');

// Crée le dossier de sortie si nécessaire
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

function getGalerieImages(dir) {
  return fs
    .readdirSync(dir)
    .filter(file =>
      validExtensions.includes(path.extname(file).toLowerCase()) &&
      !file.startsWith('.')
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildGaleries() {
  const galeries = {};

  fs.readdirSync(galeriesRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .forEach(folder => {
      const folderName = folder.name;
      const folderPath = path.join(galeriesRoot, folderName);
      const images = getGalerieImages(folderPath).map(
        img => `assets/images/galeries/${folderName}/${img}`
      );
      galeries[folderName] = images;
    });

  fs.writeFileSync(outputFile, JSON.stringify(galeries, null, 2), 'utf-8');
  console.log(`✅  galeries.json généré : ${outputFile}`);
}

buildGaleries();