import Header from './components/header';
import ImageContainer from './components/imageContainer';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  if (!body) {
    console.error('Body element not found.');
    return;
  }
  body.innerHTML = '';
  [Header, ImageContainer].forEach((component) =>
    body.appendChild(component.render())
  );
});
