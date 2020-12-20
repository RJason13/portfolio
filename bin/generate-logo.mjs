#!/usr/bin/env node
import { copyFile, readdir, unlinkSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import builder from 'xmlbuilder';
import sharp from 'sharp';
import icongen from 'icon-gen';

// TODO: use a more proper icon generator

const outDir = 'src/assets/img/logo';
const publicDir = 'public';

outDir.split('/').reduce((t,x) => {
  const dir = `${t}/${x}`;
  if (!existsSync(dir)) mkdirSync(dir);
  return dir;
}, path.resolve(''))
const icoSizes = [
  16,
  24,
  32,
  48,
  57,
  64,
  72,
  96,
  120,
  128,
  144,
  152,
  192,
  195,
  228,
  256,
  512,
  1024
];
const favicoSize = 64;
const logoSizes = [192, 512];
const baseSize = 640;
const faviconPrefix = 'favicon-';

const renderSvg = scale => {
  const size = baseSize * scale;
  const borderSize = size * 0.05;
  const borderRadius = size / 8;

  const headRadius = size * 0.125;
  const neckPos = {
    x: size * 0.4,
    y: borderSize * 2 + headRadius * 2
  };
  const waistPos = {
    x: size * 0.425,
    y: size * 0.575
  };
  const shoulderPos = {
    x: (neckPos.x + waistPos.x) * 0.5,
    y: (neckPos.y + waistPos.y) * 0.5
  };

  const svg = builder.create('svg', { headless: true }).att({
    // xmlns: 'http://www.w3.org/2000/svg',
    // 'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    preserveAspectRatio: 'xMinYMin meet',
    viewBox: `0 0 ${size} ${size}`
  });

  // layout
  svg.ele('rect', {
    width: size - borderSize,
    height: size - borderSize,
    x: borderSize / 2,
    y: borderSize / 2,
    rx: borderRadius,
    ry: borderRadius,
    'stroke-width': borderSize,
    stroke: 'white',
    fill: 'black'
  });

  // head
  svg.ele('circle', {
    r: headRadius,
    cx: size * 0.4,
    cy: borderSize * 2 + headRadius,
    fill: 'none',
    stroke: 'white',
    'stroke-width': borderRadius / 2
  });

  // body
  svg.ele('line', {
    x1: neckPos.x,
    x2: waistPos.x,
    y1: neckPos.y,
    y2: waistPos.y,
    stroke: 'white',
    'stroke-width': borderRadius / 2
  });

  // hands
  svg.ele('path', {
    d: [
      ['M', size * 0.2, size * 0.3],
      ['L', size * 0.19, (size * 0.7 + borderSize * 2 + headRadius * 2) * 0.45],
      ['L', shoulderPos.x, shoulderPos.y],
      ['L', size * 0.75, size * 0.3]
    ]
      .map(x => x.join(' '))
      .join(' '),
    stroke: 'white',
    'stroke-width': borderRadius / 2,
    fill: 'none'
  });

  // legs
  svg.ele('path', {
    d: [
      ['M', size * 0.35, size * 0.9],
      ['L', waistPos.x, waistPos.y],
      [
        'L',
        waistPos.x + size * 0.1,
        waistPos.y + (size * 0.9 - waistPos.y) * 0.4
      ],
      ['L', size * 0.5, size * 0.9]
    ]
      .map(x => x.join(' '))
      .join(' '),
    stroke: 'white',
    'stroke-width': borderRadius / 2,
    fill: 'none'
  });

  return svg.end({
    pretty: true
  });
};

const generateFavicons = () => {
  icongen(outDir, outDir, {
    report: true,
    ico: {
      name: 'logo',
      sizes: [16, 24, 32, 48, 64, 128, 256]
    },
    icns: {
      name: 'logo',
      sizes: [16, 32, 64, 128, 256, 512, 1024]
    },
    favicon: {
      name: faviconPrefix,
      icoSizes: [favicoSize]
    }
  })
    .then(results => {
      console.log(results);

      // copy selected sizes to public logo
      for (let i = 0; i < icoSizes.length; i++) {
        const icoSize = icoSizes[i];
        const thumbPath = path.join(outDir, icoSize.toString());
        const renamedThumbPath = path.join(outDir, 'logo_' + icoSize.toString());
        ['.svg', '.png'].forEach((ext) => {
          copyFile(
            thumbPath + ext,
            renamedThumbPath + ext,
            () => {
              unlinkSync(thumbPath + ext);
            }
          );
  
          if (ext !== '.png' || !logoSizes.includes(icoSize)) return;
          copyFile(
            renamedThumbPath + ext,
            path.join(publicDir, 'logo_' + icoSize.toString()) + ext,
            () => null
          );
        });
      }

      readdir(outDir, (err, files) => {
        files.forEach(file => {
          if (file.startsWith(faviconPrefix) || file === 'favicon.ico') {
            copyFile(
              path.join(outDir, file),
              path.join(publicDir, file),
              () => {
                unlinkSync(path.join(outDir, file));
              }
            );
          }
        });
      });
    })
    .catch(err => {
      console.error(err);
    });
};

const promises = [];
for (let i = 0; i < icoSizes.length; i++) {
  const icoSize = icoSizes[i];
  // let faviconSvgOut = svgOut.replace(".svg", "-" + icoSize + ".svg");
  const thumbOut = path.join(outDir, icoSize + '.svg');
  writeFileSync(thumbOut, renderSvg(icoSize / baseSize, icoSize !== favicoSize));
  promises.push(sharp(thumbOut)
    .png()
    .toFile(thumbOut.replace('.svg', '.png')));
}

Promise.all(promises).then(() => generateFavicons()).catch(err => console.log(err));
