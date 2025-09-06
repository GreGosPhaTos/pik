import { Component } from './component';

const createHeaderElement = () => {
  const header = document.createElement('header');
  header.id = 'main-header';
  header.classList.add(
    'p-8',
    'flex',
    'items-center',
    'justify-between',
    'mb-8',
    'py-6',
    'sticky',
    'top-0',
    'z-50',
    'transition-all',
    'duration-300',
    'bg-gray-50',
    'text-gray-900'
  );

  // Création du titre
  const title = document.createElement('h1');
  title.classList.add('text-5xl', 'font-bold', 'tracking-tight');
  title.textContent = 'Pik';

  // Création du bouton
  const actionButton = document.createElement('button');
  actionButton.id = 'action-button';
  actionButton.classList.add(
    'py-2',
    'px-4',
    'rounded-xl',
    'bg-emerald-500',
    'text-white',
    'font-bold',
    'text-lg',
    'shadow-lg'
  );
  actionButton.textContent = 'Activer la sélection';

  header.appendChild(title);
  header.appendChild(actionButton);

  return header;
};

const setupHeaderListeners = (header: HTMLElement) => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-gray-900', 'text-gray-50', 'shadow-md');
      header.classList.remove('bg-gray-50', 'text-gray-900');
    } else {
      header.classList.remove('bg-gray-900', 'text-gray-50', 'shadow-md');
      header.classList.add('bg-gray-50', 'text-gray-900');
    }
  });
};

const render = () => {
  const header = createHeaderElement();
  setupHeaderListeners(header);
  return header;
};

export default { render } as Component<null, Node>;
