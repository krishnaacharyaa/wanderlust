import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const huskyDir = path.join(process.cwd(), '.husky');
if (!fs.existsSync(huskyDir)) process.exit(0);

const platform = os.platform();

if (platform === 'win32') {
  const user = process.env.USERNAME;
  const identity = user || 'Users';
  for (const name of fs.readdirSync(huskyDir)) {
    const fullPath = path.join(huskyDir, name);
    if (fs.statSync(fullPath).isFile()) {
      execSync(`icacls "${fullPath}" /grant "${identity}":RX`, { stdio: 'inherit' });
    }
  }
  process.exit(0);
}

for (const name of fs.readdirSync(huskyDir)) {
  const fullPath = path.join(huskyDir, name);
  if (fs.statSync(fullPath).isFile()) {
    execSync(`chmod +x "${fullPath}"`, { stdio: 'inherit' });
  }
}
