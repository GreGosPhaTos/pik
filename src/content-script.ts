// content-script.js - S'exécute sur la page web active
import { ActionNames, sendMessage } from './actions';

// run the function to get images as soon as the script is injected
(function getImages() {
  const images = document.querySelectorAll('img');
  const imageUrls: string[] = [];

  // scrape images in the current tab
  images.forEach((img: HTMLImageElement) => {
    if (img.src && img.naturalWidth > 50 && img.naturalHeight > 50) {
      imageUrls.push(img.src);
    }
  });

  // send the list of URLs to the popup
  sendMessage({
    action: ActionNames.images_found,
    images: imageUrls,
  });
})();
