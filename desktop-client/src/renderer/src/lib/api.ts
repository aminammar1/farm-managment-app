import { getRuntimeConfig } from './runtime-config';
import { getAuthToken } from './storage';

interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
}

export const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}): Promise<T> => {
  const { auth = true, headers, ...rest } = options;
  const token = getAuthToken();
  const response = await fetch(`${getRuntimeConfig().apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {})
    }
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorBody?.message ?? 'Request failed');
  }

  return response.json() as Promise<T>;
};
