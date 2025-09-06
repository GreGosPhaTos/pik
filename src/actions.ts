export const ActionNames = {
  images_found: 'images_found',
  get_images: 'get_images',
};

export type ActionCallback = (
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (message: any) => void
) => void;

export const initListeners = (
  actions: Record<string, ActionCallback>,
  context: string
) => {
  const events = { ...actions }; // Utiliser une variable locale pour le contexte
  console.log(
    `[${context}] initialized actions: ${Object.keys(events).join(', ')}`
  );

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Vérifie si le message a une action et si elle est gérée dans CE contexte
    if (request.action && events?.[request.action]) {
      try {
        console.info(`[${context}] action "${request.action}" triggered`);
        events[request.action](request, sender, sendResponse);
      } catch (e) {
        console.error(
          `[${context}] Une erreur est survenue lors de l'exécution de l'action "${request.action}":`,
          e
        );
        return false;
      }
    } else {
      // Le message est bien reçu, mais il n'est pas destiné à ce contexte, ce qui est normal.
      // On ne loggue plus une erreur, mais une simple info pour la traçabilité.
      console.info(
        `[${context}] Message "${request.action}" received, but no listener was found.`
      );
    }
    // L'écouteur doit toujours retourner true pour indiquer qu'il peut potentiellement envoyer une réponse asynchrone.
    return true;
  });
};

export const sendMessage: (message: {
  action: string;
  [key: string]: unknown;
}) => void = chrome.runtime.sendMessage;
