/**
 * generateGallery.js  – exécuté avec :  node assets/scripts/generateGallery.js
 * --------------------------------------------------------------------------
 * Parcourt assets/galeries/<cat>/*.{webp,jpg,jpeg,png,gif,avif}
 * et génère galeries.json à la racine du projet.
 */

const fs = require("fs");
const path = require("path");

// Chemin correct vers tes galeries :
const galeriesRoot = path.join(__dirname, "..", "images", "galeries");
// Le JSON sera écrit dans assets/galeries/
const outputFile = path.join(__dirname, "..", "galeries", "galeries.json");

const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function getGalerieImages(dir) {
  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        validExtensions.includes(path.extname(file).toLowerCase()) &&
        !file.startsWith(".")
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildGaleries() {
  const galeries = {};
  fs.readdirSync(galeriesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((folder) => {
      const folderName = folder.name;
      const folderPath = path.join(galeriesRoot, folderName);
      const images = getGalerieImages(folderPath).map(
        (img) => `assets/images/galeries/${folderName}/${img}`
      );
      galeries[folderName] = images;
    });

  fs.writeFileSync(outputFile, JSON.stringify(galeries, null, 2), "utf-8");
  console.log("galeries.json généré avec succès dans assets/galeries/ !");
}

buildGaleries();
