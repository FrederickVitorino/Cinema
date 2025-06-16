import { useEffect, useState } from "react";
import { FilmeForm } from "../components/FilmesForm.jsx"; 
import { FilmesTables } from "../components/FilmesTables.jsx";
import {
  getFilmes,
  createFilme,
  updateFilme,
  deleteFilme,
} from "../services/filmeApi";

export function FilmesPage() { 
  const [filmes, setFilmes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarFilmes() {
    setLoading(true);
    setErro("");
    try {
      const data = await getFilmes();
      setFilmes(data);
    } catch (e) {
      setErro("Erro ao carregar filmes do backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  const handleSubmit = async (dados) => {
    setErro("");
    try {
      const dadosCorrigidos = {
        titulo: dados.titulo,
        genero: dados.genero,
        classificacao: dados.classificacao,
        duracao: Number(dados.duracao),
        dataEstreia: dados.estreia ? new Date(dados.estreia).toISOString() : undefined,
        descricao: dados.descricao,
      };
      delete dadosCorrigidos.estreia;
      if (editando !== null) {
        await updateFilme(editando, dadosCorrigidos);
        setEditando(null);
      } else {
        await createFilme(dadosCorrigidos);
      }
      await carregarFilmes();
    } catch (e) {
      setErro("Erro ao salvar filme");
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este filme?")) {
      setErro("");
      try {
        await deleteFilme(id);
        if (editando === id) setEditando(null);
        await carregarFilmes();
      } catch (e) {
        setErro("Erro ao excluir filme");
        await carregarFilmes();
      }
    }
  };

  const filmeEditando = editando !== null ? (() => {
    const f = filmes.find((f) => f.id === editando);
    if (!f) return undefined;
    return {
      ...f,
      estreia: f.dataEstreia ? f.dataEstreia.slice(0, 10) : '',
    };
  })() : undefined;

  return (
    <>
      <h4>Filmes</h4>
      <hr />
      {erro && <div className="alert alert-danger">{erro}</div>}
      <FilmeForm
        {...(filmeEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'novo'} 
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br />
      <h4>Lista de Filmes</h4>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <FilmesTables filmes={filmes} onEditar={handleEditar} onExcluir={handleExcluir} />
      )}
    </>
  );
}