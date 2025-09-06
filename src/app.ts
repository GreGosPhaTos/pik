import Header from './components/header';
import ImageContainer from './components/imageContainer';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('body');
  if (!body) {
    console.error("L'élément body est introuvable.");
    return;
  }
  body.innerHTML = '';
  [Header, ImageContainer].forEach((component) =>
    body.appendChild(component.render())
  );
});
