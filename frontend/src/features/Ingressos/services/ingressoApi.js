const API_URL = 'http://localhost:3000/ingressos';

export async function getIngressos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar ingressos');
  return res.json();
}

export async function createIngresso(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar ingresso');
  return res.json();
}
