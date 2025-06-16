const API_URL = 'http://localhost:3000/salas';

export async function getSalas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar salas');
  return res.json();
}

export async function createSala(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar sala');
  return res.json();
}

export async function updateSala(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar sala');
  return res.json();
}

export async function deleteSala(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Erro ao deletar sala');
  return res.json();
}
