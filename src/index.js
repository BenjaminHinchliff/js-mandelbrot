import { complex, multiply, add } from 'mathjs';

const MAX_ITERS = 50;
const ESCAPE_RADIUS = 20;
const SIZE = 4.0;

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#mandelbrot-canvas');
if (!canvas) throw new Error('mandelbrot canvas does not exist!');
const ctx = canvas.getContext('2d');

const { width, height } = canvas;

const img = ctx.createImageData(width, height);
for (let row = 0; row < height; row += 1) {
  for (let col = 0; col < width; col += 1) {
    const c = complex(
      ((col - width / 2.0) * SIZE) / width,
      ((row - height / 2.0) * SIZE) / width,
    );

    let z = complex(0, 0);
    let iters;
    for (iters = 0; iters < MAX_ITERS; iters += 1) {
      if (z.toPolar().r > ESCAPE_RADIUS) {
        break;
      }
      z = add(multiply(z, z), c);
    }

    const shade = (iters / MAX_ITERS) * 255;
    const i = 4 * row * width + 4 * col; // calculate index from row and col
    img.data[i] = shade; // R
    img.data[i + 1] = shade; // G
    img.data[i + 2] = shade; // B
    img.data[i + 3] = 255; // A
  }
}
ctx.putImageData(img, 0, 0);
