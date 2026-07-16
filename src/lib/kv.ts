import { PortfolioData } from './types';
import { defaultPortfolioData } from './data';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw) as PortfolioData;
      // Ensure customSections exists for backwards compatibility
      if (!data.customSections) {
        data.customSections = [];
      }
      return data;
    }
    // If no saved file, write defaults and return them
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultPortfolioData, null, 2));
    return defaultPortfolioData;
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return defaultPortfolioData;
  }
}

export async function updatePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing portfolio data:', error);
    return false;
  }
}
