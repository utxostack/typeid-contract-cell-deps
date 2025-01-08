import * as fs from 'fs';
import * as path from 'path';
import { fetchCellDeps } from './fetcher';

const fetchAndUpdateCellDeps = async () => {
  const jsonData = await fetchCellDeps();
  // Specify the file path
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(__dirname, '..', 'deployment/cell-deps.json');

  // Write JSON string to file
  try {
    fs.writeFileSync(filePath, jsonData);
    console.log('JSON data has been written to', filePath);
  } catch (err) {
    console.error('Error writing JSON to file:', err);
  }
};

fetchAndUpdateCellDeps();
