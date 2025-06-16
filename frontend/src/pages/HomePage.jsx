import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/buttons/Button';

export function HomePage() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const res = await fetch('http://localhost:3000/filmes');
        const data = await res.json();
        setFilmes(data);
      } catch {
        setFilmes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFilmes();
  }, []);

  const handleComprar = async (filmeId) => {
    const res = await fetch('http://localhost:3000/sessoes');
    const sessoes = await res.json();
    const sessaoFilme = sessoes.find(s => s.filmeId === filmeId);
    if (sessaoFilme) {
      navigate(`/ingressos?vendaSessao=${sessaoFilme.id}`);
    } else {
      alert('Não há sessões disponíveis para este filme.');
    }
  };

  return (
    <main>
      <h1 style={{ marginBottom: 0 }}>Bem-vindo ao CineTech!</h1>
      <h2 style={{ marginTop: 32, marginBottom: 24 }}>Filmes em Cartaz</h2>
      {loading ? <div>Carregando filmes...</div> : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          {filmes.length === 0 ? <div>Nenhum filme disponível.</div> : filmes.map(filme => (
            <div key={filme.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h4>{filme.titulo}</h4>
              <div><b>Gênero:</b> {filme.genero}</div>
              <div><b>Classificação:</b> {filme.classificacao}</div>
              <div><b>Duração:</b> {filme.duracao} min</div>
              <div><b>Estreia:</b> {filme.dataEstreia ? new Date(filme.dataEstreia).toLocaleDateString('pt-BR') : '-'}</div>
              <Button text={<span><span style={{marginRight:8}}><i className="bi bi-ticket" /></span>Comprar Ingresso</span>} variant="success" size="sm" icon={null} onClick={() => handleComprar(filme.id)} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
