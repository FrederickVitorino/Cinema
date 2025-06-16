import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';

export default function SessoesDisponiveisPage() {
  const [sessoes, setSessoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sessoesStorage = JSON.parse(localStorage.getItem('sessoes') || '[]');
    setSessoes(sessoesStorage);
  }, []);

  function handleComprar(sessaoId) {
    navigate(`/ingressos?vendaSessao=${sessaoId}`);
  }

  return (
    <div className="container mt-4">
      <h2>Sessões Disponíveis</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered border-secondary" id="tabela-sessoes-disponiveis">
          <thead>
            <tr>
              <th scope="col">Filme</th>
              <th scope="col">Sala</th>
              <th scope="col">Data e Hora</th>
              <th scope="col">Preço</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {sessoes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">Nenhuma sessão disponível.</td>
              </tr>
            ) : (
              sessoes.map(sessao => (
                <tr key={sessao.id}>
                  <td>{sessao.filme}</td>
                  <td>{sessao.sala}</td>
                  <td>{sessao.horario}</td>
                  <td>{sessao.preco ? `R$ ${Number(sessao.preco).toFixed(2)}` : '-'}</td>
                  <td>
                    <Button text="Comprar" variant="success" size="sm" onClick={() => handleComprar(sessao.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
