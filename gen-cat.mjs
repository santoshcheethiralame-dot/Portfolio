import fs from 'fs';

// 16 x 18 pixel grumpy black cat
const MAP = [
  '.#..........#...',
  '.##........##...',
  '.#o#......#o#...',
  '.#oo#....#oo#...',
  '.#oo######oo#...',
  '.##############.',
  '################',
  '################',
  '##yyyy##yyyy###.',
  '##yppy##yppy###.',
  '################',
  '######nn######..',
  '######mm######..',
  '.##############.',
  '.##############.',
  '..############..',
  '...##########...',
  '....########....',
];

const C = {
  '#': '#22222c',
  o: '#e8923c',
  y: '#efe0a0',
  p: '#2b2b1c',
  n: '#e8728e',
  m: '#15151c',
};

const W = 16, H = 18;
let rects = '';
MAP.forEach((row, y) => {
  [...row].forEach((ch, x) => {
    if (C[ch]) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${C[ch]}"/>`;
  });
});

// sparse lavender rain
let rain = '';
const drops = [
  [1, 0], [3.5, 5], [6, 2], [8.5, 9], [11, 1], [13.5, 6], [2.5, 12], [10.5, 14], [5, 15], [14.5, 11],
];
drops.forEach(([x, y]) => {
  rain += `<rect x="${x}" y="${y}" width="0.22" height="2.6" fill="#b9a8da" opacity="0.5"/>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e1318"/><stop offset="1" stop-color="#24090d"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
${rain}
${rects}
</svg>`;

fs.writeFileSync('public/img/cat.svg', svg);
console.log('cat.svg written', svg.length, 'bytes');
