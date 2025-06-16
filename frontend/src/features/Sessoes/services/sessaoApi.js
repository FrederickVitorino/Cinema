const API_URL = 'http://localhost:3000/sessoes';

export async function getSessoes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar sessões');
  return res.json();
}

export async function createSessao(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar sessão');
  return res.json();
}

export async function updateSessao(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar sessão');
  return res.json();
}

export async function deleteSessao(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Erro ao deletar sessão');
  return res.json();
}
