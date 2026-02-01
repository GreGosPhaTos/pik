import { useSelectedImages } from '../context/selected-images';
import { Component } from './component';

type Props = {
  image: {
    url: string;
    desc?: string;
    title?: string;
  };
  onSelect?: (card: HTMLElement) => void;
};

const render = (props: Props) => {
  const { image, onSelect } = props;

  // state
  const { addCard, removeCard, getCount, getSelectedElementsSet } = useSelectedImages();

  function handleOnClick(card: HTMLElement) {
    const cards = getSelectedElementsSet();
    const actionButton = document.getElementById('action-button');
    if (cards.has(card)) {
      card.classList.remove('card-selected');
      removeCard(card);

      if (!getCount()) {
        actionButton?.classList?.remove('show');
      }
      return;
    }

    card.classList.add('card-selected');
    addCard(card);
    actionButton?.classList?.add('show');
  }

  // 1. Create a DocumentFragment to build our elements in memory.
  const fragment = document.createDocumentFragment();

  // 3. Create the card structure using createElement.
  const card = document.createElement('div');
  card.classList.add(
    'card',
    'p-4',
    'rounded-xl',
    'border-2',
    'border-transparent',
    'bg-white',
    'shadow-sm',
    'hover:border-emerald-500',
    'transition-all',
    'duration-200',
    'cursor-pointer'
  );

  // Add the click handler
  card.onclick = () => {
    handleOnClick(card);
    onSelect?.(card);
  };

  const imageContainer = document.createElement('div');
  imageContainer.classList.add(...'flex items-center space-x-4'.split(' '));

  const thumbnail = document.createElement('div');
  thumbnail.classList.add(
    'w-36',
    'h-36',
    'bg-gray-200',
    'rounded-lg',
    'flex',
    'items-center',
    'justify-center',
    'overflow-hidden'
  );
  const imgElement = document.createElement('img');
  imgElement.classList.add('w-35', 'h-35', 'object-cover');
  imgElement.src = image.url;
  thumbnail.appendChild(imgElement);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('flex-1');

  const titleElement = document.createElement('h3');
  titleElement.classList.add('text-xl', 'font-semibold', 'text-gray-900');
  titleElement.textContent = image.title || 'Card title';

  const descElement = document.createElement('p');
  descElement.classList.add('text-gray-500', 'mt-1');
  descElement.textContent = image.desc || 'An option for your list.';

  contentContainer.appendChild(titleElement);
  contentContainer.appendChild(descElement);
  imageContainer.appendChild(thumbnail);
  imageContainer.appendChild(contentContainer);
  card.appendChild(imageContainer);

  fragment.appendChild(card);

  return fragment;
};

export default { render } as Component<Props, Node>;
