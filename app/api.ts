import { API_BASE } from './config';

export async function getHealth() {
  console.log('Fetching:', `${API_BASE}/health`);
  const res = await fetch(`${API_BASE}/health`);
  

  if (!res.ok) {
    throw new Error('Backend error');
  }

  return res.json();
}