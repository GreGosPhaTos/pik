// content-script.js - S'exécute sur la page web active
import { ActionNames, sendMessage } from './actions';

function getImages() {
  const images = document.querySelectorAll('img');
  const imageUrls: string[] = [];

  // On parcourt toutes les balises <img> pour extraire les URLs
  images.forEach((img: HTMLImageElement) => {
    // On s'assure que l'image a une source et une taille minimale
    if (img.src && img.naturalWidth > 50 && img.naturalHeight > 50) {
      imageUrls.push(img.src);
    }
  });

  // On renvoie la liste des URLs au popup
  sendMessage({
    action: ActionNames.images_found,
    images: imageUrls,
  });
}

// On exécute la fonction pour récupérer les images dès que le script est injecté
getImages();
