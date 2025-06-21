import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const huskyDir = path.join(process.cwd(), '.husky');

if (!fs.existsSync(huskyDir)) {
  console.log('No .husky directory found, skipping postinstall');
  process.exit(0);
}

const platform = os.platform();
const isWindows = platform === 'win32';

console.log(`Setting up Husky hooks for ${platform}...`);

try {
  const files = fs.readdirSync(huskyDir);
  const hookFiles = files.filter(name => {
    const fullPath = path.join(huskyDir, name);
    return fs.statSync(fullPath).isFile();
  });

  if (hookFiles.length === 0) {
    console.log('No hook files found in .husky directory');
    process.exit(0);
  }  

  if (isWindows) {
    const user = process.env.USERNAME || process.env.HOME || 'Users';
    console.log(`Setting Windows permissions for user: ${user}`);
    
    for (const name of hookFiles) {
      const fullPath = path.join(huskyDir, name);
      try {
        execSync(`icacls "${fullPath}" /grant "${user}":RX`, { 
          encoding: 'utf8' 
        });
        console.log(`✓ Set permissions for ${name}`);
      } catch (error) {
        console.warn(`⚠ Failed to set permissions for ${name}:`, error.message);
      }
    }
  } else {
    console.log('Setting Unix permissions...');
    
    for (const name of hookFiles) {
      const fullPath = path.join(huskyDir, name);
      try {
        execSync(`chmod +x "${fullPath}"`, { 
          encoding: 'utf8' 
        });
        console.log(`✓ Made ${name} executable`);
      } catch (error) {
        console.warn(`⚠ Failed to make ${name} executable:`, error.message);
      }
    }
  }

  console.log('Husky hooks setup completed successfully');
} catch (error) {
  console.error('Error setting up Husky hooks:', error.message);
  process.exit(0);
}
