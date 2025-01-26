import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core'
import { fetchCellDeps } from './fetcher';

const checkCellDeps = async () => {
  const jsonData = await fetchCellDeps();
  // Specify the file path
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(__dirname, '..', 'deployment/cell-deps.json');

  // Write JSON string to file
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    console.log('Successfully read file:', filePath);
    if (fileData === jsonData) {
      console.log('Cell Deps have not changed');
    } else {
      core.setFailed('Cell Deps have changed and a new Pull Request should be created');
    }
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }
};

checkCellDeps();
