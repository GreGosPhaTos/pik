// service-worker.ts - Service Worker
import { ActionNames, initListeners } from './actions';

initListeners({ [ActionNames.get_images]: handleGetImages }, 'service-worker');

/**
 * @param {Object} request - L'objet de requête reçu.
 */
function handleGetImages(request: { tabId: number }) {
  const { tabId } = request;
  if (tabId) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['content-script.js'],
    });
  } else {
    console.error(
      "Erreur: ID de l'onglet manquant dans la requête de get_images."
    );
  }
}
