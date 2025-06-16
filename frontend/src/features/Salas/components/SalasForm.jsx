import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons/Button";
import { SelectInput } from "../../../components/Input/SelectInput";
import { LabelInput } from "../../../components/Input/LabelInput";

export function SalasForm({ id, nome = "", capacidade = "", tipo = "", onSubmit, editando = false, onCancelarEdicao }) {
  const [formData, setFormData] = useState({
    nome,
    capacidade,
    tipo: ""
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (editando) {
      setFormData({ nome, capacidade, tipo });
    } else {
      setFormData({ nome: "", capacidade: "", tipo: "" });
    }
  }, [nome, capacidade, tipo, editando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          id="nome"
          label="Nome da Sala"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-3">
        <LabelInput
          id="capacidade"
          label="Capacidade"
          type="number"
          value={formData.capacidade}
          onChange={handleChange}
          required
          min={1}
        />
      </div>
      <div className="col-md-3">
        <SelectInput
          id="tipo"
          label="Tipo da Sala"
          value={formData.tipo}
          onChange={handleChange}
          options={[
            { value: "2D", label: "2D" },
            { value: "3D", label: "3D" },
            { value: "IMAX", label: "IMAX" }
          ]}
        />
        {validated && !formData.tipo && (
          <div className="invalid-feedback">Selecione um tipo.</div>
        )}
      </div>
      <div className="col-12 d-flex gap-2">
        <Button
          text="Salvar"
          variant="primary"
          size="btn-sm"
          type="submit"
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
