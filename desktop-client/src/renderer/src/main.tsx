import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import { App } from './App';
import { setRuntimeConfig } from './lib/runtime-config';

const runtimeConfig = window.farmDesk
  ? await window.farmDesk.getRuntimeConfig()
  : {
      apiBaseUrl: 'http://127.0.0.1:4545',
      appName: 'Ferma-TN'
    };

setRuntimeConfig(runtimeConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
