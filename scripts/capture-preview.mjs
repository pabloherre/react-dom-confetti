import { spawn } from 'node:child_process';
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { chromium } from 'playwright';
import gifenc from 'gifenc';
import { PNG } from 'pngjs';

const { GIFEncoder, applyPalette, quantize } = gifenc;

const root = process.cwd();
const host = '127.0.0.1';
const port = 4173;
const url = `http://${host}:${port}`;
const outputPath = path.join(root, 'preview.gif');
const vitePath = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const chromePaths = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

const chromePath = await (async () => {
  for (const candidate of chromePaths) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      continue;
    }
  }

  throw new Error('Chrome or Edge was not found. Set CHROME_PATH to a browser executable.');
})();

const server = spawn(process.execPath, [vitePath, 'preview', '--outDir', 'dist-demo', '--host', host, '--port', String(port)], {
  cwd: root,
  stdio: 'ignore',
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await wait(250);
    }
  }

  throw new Error(`Preview server did not start at ${url}.`);
};

try {
  await waitForServer();

  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });

  const encoder = GIFEncoder();
  const frameCount = 12;
  const frameDelay = 160;

  for (let frame = 0; frame < frameCount; frame += 1) {
    const image = PNG.sync.read(await page.screenshot({ type: 'png' }));
    const palette = quantize(image.data, 64);
    const indexed = applyPalette(image.data, palette);
    encoder.writeFrame(indexed, image.width, image.height, {
      palette,
      delay: frameDelay,
      repeat: 0,
    });
    await page.waitForTimeout(frameDelay);
  }

  await browser.close();
  encoder.finish();
  await writeFile(outputPath, encoder.bytes());
  console.log(`Wrote ${path.relative(root, outputPath)}`);
} finally {
  server.kill();
}
