import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const host = process.env.API_HOST ?? '127.0.0.1';
const port = Number(process.env.API_PORT ?? 4545);
const healthUrl = `http://${host}:${port}/api/health`;

const waitUntilKilled = () =>
  new Promise(() => {
    process.stdin.resume();
  });

const isBackendHealthy = async () => {
  try {
    const response = await fetch(healthUrl);
    if (!response.ok) {
      return false;
    }

    const payload = await response.json();
    return payload?.status === 'ok';
  } catch {
    return false;
  }
};

const startWatchProcess = () => {
  const child = spawn('tsx', ['watch', 'src/index.ts'], {
    stdio: 'inherit',
    shell: true
  });

  const shutdown = () => {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
};

const main = async () => {
  if (await isBackendHealthy()) {
    console.log(`Backend already running on ${healthUrl}, reusing it for desktop dev.`);
    await waitUntilKilled();
    return;
  }

  await delay(150);

  if (await isBackendHealthy()) {
    console.log(`Backend became available on ${healthUrl}, reusing it for desktop dev.`);
    await waitUntilKilled();
    return;
  }

  startWatchProcess();
};

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
