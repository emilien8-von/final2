/**
 * @jest-environment jsdom
 */

const { img } = require('../src/Pages/Acceuil'); // adapte ce chemin

describe('img function', () => {
  let image;

  beforeEach(() => {
    // Simule un élément <img id="img5" src="/easy.png" />
    document.body.innerHTML = `
      <img id="img5" src="/easy.png" />
    `;
    image = document.getElementById('img5');
  });

  test('should switch from /easy.png to /meduim.png on first hover', () => {
    img(); // appelle la fonction
    expect(image.getAttribute('src')).toBe('/meduim.png');
  });

  test('should switch from /meduim.png to /hard.png', () => {
    image.setAttribute('src', '/meduim.png');
    img();
    expect(image.getAttribute('src')).toBe('/hard.png');
  });

  test('should switch from /hard.png to /easy.png', () => {
    image.setAttribute('src', '/hard.png');
    img();
    expect(image.getAttribute('src')).toBe('/easy.png');
  });
});
