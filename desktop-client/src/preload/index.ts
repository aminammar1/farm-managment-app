import { contextBridge, ipcRenderer } from 'electron';
import type { RuntimeConfig } from '../shared/contracts';

const api = {
  getRuntimeConfig: () => ipcRenderer.invoke('app:get-runtime-config') as Promise<RuntimeConfig>
};

contextBridge.exposeInMainWorld('farmDesk', api);
