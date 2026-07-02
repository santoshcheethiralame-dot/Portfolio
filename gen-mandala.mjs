import fs from 'fs';

const cx = 300, cy = 300;
const C = { cyan: '#22E0E6', lime: '#B4FF2E', mint: '#5FFFC2', amber: '#FFB638', red: '#FF5A5A' };

// petal/leaf between two radii, pointing up (-y), in local coords centered at 0,0
function petal(r0, r1, w) {
  const m1 = r0 + (r1 - r0) * 0.32, m2 = r1 - (r1 - r0) * 0.32;
  return `<path d="M0 ${-r0} C ${w} ${-m1}, ${w} ${-m2}, 0 ${-r1} C ${-w} ${-m2}, ${-w} ${-m1}, 0 ${-r0} Z"/>`;
}
function ringPetals(n, r0, r1, w, color, sw) {
  let s = `<g fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="0.92">`;
  for (let i = 0; i < n; i++) {
    s += `<g transform="translate(${cx} ${cy}) rotate(${(360 / n * i).toFixed(2)})">${petal(r0, r1, w)}</g>`;
  }
  return s + '</g>';
}
function ringDots(n, rad, dr, color) {
  let s = `<g fill="${color}">`;
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI / n) * i;
    const x = (cx + rad * Math.sin(a)).toFixed(1), y = (cy - rad * Math.cos(a)).toFixed(1);
    s += `<circle cx="${x}" cy="${y}" r="${dr}"/>`;
  }
  return s + '</g>';
}
function ring(r, color, sw) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"/>`;
}

let b = '';
b += ring(294, C.amber, 1.4);
b += ringPetals(40, 258, 292, 7, C.amber, 1.2);
b += ring(254, C.cyan, 1);
b += ringDots(52, 240, 2, C.cyan);
b += ringPetals(20, 176, 250, 15, C.lime, 1.5);
b += ring(170, C.mint, 1);
b += ringDots(28, 154, 2.4, C.mint);
b += ringPetals(14, 98, 162, 16, C.cyan, 1.5);
b += ring(92, C.amber, 1.1);
b += ringDots(20, 80, 2.2, C.amber);
b += ringPetals(16, 42, 86, 10, C.mint, 1.3);
b += ringPetals(8, 10, 56, 16, C.lime, 1.5);
b += ring(22, C.cyan, 1.3);
b += ring(9, C.red, 1.4);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">${b}</svg>`;
fs.writeFileSync('public/img/mandala.svg', svg);
console.log('mandala.svg written,', svg.length, 'bytes');
