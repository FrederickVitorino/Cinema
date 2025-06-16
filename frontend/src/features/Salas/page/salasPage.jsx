import { useEffect, useState } from "react";
import { SalasForm } from "../components/SalasForm";
import { SalasTable } from "../components/SalasTable";
import {
  getSalas,
  createSala,
  updateSala,
  deleteSala,
} from "../services/salaApi";

export function SalasPage() {
  const [salas, setSalas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarSalas() {
    setLoading(true);
    setErro("");
    try {
      const data = await getSalas();
      setSalas(data);
    } catch (e) {
      setErro("Erro ao carregar salas do backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarSalas();
  }, []);

  const handleSubmit = async (dados) => {
    setErro("");
    try {
      if (editando !== null) {
        await updateSala(editando, dados);
        setEditando(null);
      } else {
        await createSala(dados);
      }
      await carregarSalas();
    } catch (e) {
      setErro("Erro ao salvar sala");
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta sala?")) {
      setErro("");
      try {
        await deleteSala(id);
        if (editando === id) setEditando(null);
        await carregarSalas();
      } catch (e) {
        setErro("Erro ao excluir sala");
        await carregarSalas();
      }
    }
  };

  const salaEditando = editando !== null ? salas.find((s) => s.id === editando) : undefined;

  return (
    <>
      <h4>Salas</h4>
      <hr />
      {erro && <div className="alert alert-danger">{erro}</div>}
      <SalasForm
        {...(salaEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'nova'}
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br /><h4>Lista de Salas</h4>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <SalasTable salas={salas} onEditar={handleEditar} onExcluir={handleExcluir} />
      )}
    </>
  );
}
