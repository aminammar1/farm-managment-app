import { app, BrowserWindow, ipcMain } from 'electron';
import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { RuntimeConfig } from '../shared/contracts';

dotenv.config({ path: resolve(process.cwd(), '..', '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env'), override: false });

const runtimeConfig: RuntimeConfig = {
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://127.0.0.1:4545',
  appName: process.env.APP_NAME ?? 'Ferma-TN'
};

const createWindow = async (): Promise<void> => {
  const preloadJsPath = join(__dirname, '../preload/index.js');
  const preloadMjsPath = join(__dirname, '../preload/index.mjs');
  const preloadPath = existsSync(preloadJsPath) ? preloadJsPath : preloadMjsPath;

  const mainWindow = new BrowserWindow({
    width: 1480,
    height: 940,
    minWidth: 1180,
    minHeight: 720,
    backgroundColor: '#f4efe2',
    title: runtimeConfig.appName,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    await mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    await mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
};

app.whenReady().then(async () => {
  ipcMain.handle('app:get-runtime-config', async () => runtimeConfig);
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
