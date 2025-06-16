const API_URL = 'http://localhost:3000/filmes';

export async function getFilmes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar filmes');
  return res.json();
}

export async function createFilme(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar filme');
  return res.json();
}

export async function updateFilme(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar filme');
  return res.json();
}

export async function deleteFilme(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar filme');
  return res.json();
}
