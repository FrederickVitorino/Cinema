import { useEffect, useState } from "react";
import { SessaoForm } from "../components/SessaoForm";
import { SessaoTables } from "../components/SessaoTables";
import {
  getSessoes,
  createSessao,
  updateSessao,
  deleteSessao,
} from "../services/sessaoApi";

export function SessoesPage() {
  const [sessoes, setSessoes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarSessoes() {
    setLoading(true);
    setErro("");
    try {
      const data = await getSessoes();
      setSessoes(data);
    } catch (e) {
      setErro("Erro ao carregar sessões do backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarSessoes();
  }, []);

  const handleSubmit = async (dados) => {
    setErro("");
    try {
      const dadosCorrigidos = {
        filmeId: Number(dados.filme),
        salaId: Number(dados.sala),
        dataHora: dados.horario ? new Date(dados.horario).toISOString() : undefined,
        preco: Number(dados.preco),
        idioma: dados.idioma,
        formato: dados.formato,
      };
      if (editando !== null) {
        await updateSessao(editando, dadosCorrigidos);
        setEditando(null);
      } else {
        await createSessao(dadosCorrigidos);
      }
      await carregarSessoes();
    } catch (e) {
      setErro("Erro ao salvar sessão");
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta sessão?")) {
      setErro("");
      try {
        await deleteSessao(id);
        if (editando === id) setEditando(null);
        await carregarSessoes();
      } catch (e) {
        setErro("Erro ao excluir sessão");
        await carregarSessoes();
      }
    }
  };

  const sessaoEditando = editando !== null ? (() => {
    const s = sessoes.find((s) => s.id === editando);
    if (!s) return undefined;
    return {
      ...s,
      filme: s.filme && typeof s.filme === 'object' ? s.filme.id : s.filme,
      sala: s.sala && typeof s.sala === 'object' ? s.sala.id : s.sala,
      horario: s.dataHora ? s.dataHora.slice(0, 16) : s.horario,
    };
  })() : undefined;

  return (
    <>
      <h4>Sessões</h4>
      <hr />
      {erro && <div className="alert alert-danger">{erro}</div>}
      <SessaoForm
        {...(sessaoEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'nova'}
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br /><h4>Lista de Sessões</h4>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <SessaoTables sessoes={sessoes} onEditar={handleEditar} onExcluir={handleExcluir} />
      )}
    </>
  );
}
