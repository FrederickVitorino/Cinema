import { useState, useEffect } from "react";
import { Button } from "../../../components/Buttons/Button";
import { SelectInput } from "../../../components/Input/SelectInput";
import { LabelInput } from "../../../components/Input/LabelInput";

export function FilmeForm({
  titulo = "",
  genero = "",
  classificacao = "",
  duracao = "",
  estreia = "",
  descricao = "",
  onSubmit,
  editando = false,
  onCancelarEdicao,
}) {
  const [formData, setFormData] = useState({
    titulo,
    genero,
    classificacao,
    duracao,
    estreia,
    descricao,
    termos: false,
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setFormData({
      titulo,
      genero,
      classificacao,
      duracao,
      estreia,
      descricao,
      termos: false,
    });
  }, [titulo, genero, classificacao, duracao, estreia, descricao, editando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      onSubmit?.(formData);
    }

    setValidated(true);
  };

  return (
    <form
      className={`row g-3 needs-validation ${validated ? "was-validated" : ""}`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="col-md-6">
        <LabelInput
          id="titulo"
          label="Título do Filme"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <SelectInput
          id="genero"
          label="Gênero"
          value={formData.genero}
          onChange={handleChange}
          options={[
            { value: "Ação", label: "Ação" },
            { value: "Animação", label: "Animação" },
            { value: "Aventura", label: "Aventura" },
            { value: "Comédia", label: "Comédia" },
            { value: "Drama", label: "Drama" },
            { value: "Romance", label: "Romance" },
            { value: "Suspense", label: "Suspense" },
            { value: "Terror", label: "Terror" },
          ]}
        />
        {validated && !formData.genero && (
          <div className="invalid-feedback">Selecione um gênero.</div>
        )}
      </div>

      <div className="col-md-4">
        <SelectInput
          id="classificacao"
          label="Classificação"
          value={formData.classificacao}
          onChange={handleChange}
          options={[
            { value: "Livre", label: "Livre" },
            { value: "10", label: "10 anos" },
            { value: "12", label: "12 anos" },
            { value: "14", label: "14 anos" },
            { value: "16", label: "16 anos" },
            { value: "18", label: "18 anos" },
          ]}
        />
        {validated && !formData.classificacao && (
          <div className="invalid-feedback">Selecione uma classificação.</div>
        )}
      </div>

      <div className="col-md-4">
        <LabelInput
          id="duracao"
          label="Duração (minutos)"
          type="number"
          value={formData.duracao}
          onChange={handleChange}
          required
          min={1}
        />
      </div>

      <div className="col-md-4">
        <LabelInput
          id="estreia"
          label="Data de Estreia"
          type="date"
          value={formData.estreia}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12">
        <LabelInput
          id="descricao"
          label="Descrição"
          as="textarea"
          value={formData.descricao}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="col-12 d-flex gap-2">
        <Button
          text="Salvar"
          variant="primary"
          size="btn-sm"
          type="submit"
          loading={false}
        />
        {editando && (
          <Button
            text="Cancelar Edição"
            variant="secondary"
            size="btn-sm"
            type="button"
            onClick={onCancelarEdicao}
          />
        )}
      </div>
    </form>
  );
}
