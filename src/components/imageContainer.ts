import { ActionNames, initListeners, sendMessage } from './../actions';
import { Component } from './component';
import ImageCard from './imageCard';

const ID = 'img-list';
// Listen to the found_images event
function foundImages(request: { images: string[] }) {
  const imagesContainer = document.getElementById(ID);
  if (!imagesContainer) {
    console.error('img-list not found');
    return;
  }

  imagesContainer.innerHTML = '';
  if (!request.images?.length) {
    imagesContainer.innerHTML = imagesContainer.innerHTML =
      '<p class="text-red-400 text-sm">No images found on this page.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  request.images.forEach((url) => {
    const imageCardFragment = ImageCard.render({ image: { url } });
    fragment.appendChild(imageCardFragment);
  });

  // Ajoute le fragment entier au DOM en une seule opération
  imagesContainer.appendChild(fragment);
}

function render() {
  const imageContainer = document.createElement('main');
  imageContainer.classList.add('space-y-6', 'p-8');
  imageContainer.id = ID;
  imageContainer.textContent = 'Loading images ...';
  // 1. First, we initialize all the listeners.
  initListeners({ [ActionNames.images_found]: foundImages }, 'popup');

  // 2. ONLY AFTER the listeners are initialized, we send the initial message.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs.length > 0) {
      const tabId = tabs[0].id;
      sendMessage({ action: ActionNames.get_images, tabId: tabId });
    }
  });

  return imageContainer;
}

export default { render } as Component<void, Node>;
