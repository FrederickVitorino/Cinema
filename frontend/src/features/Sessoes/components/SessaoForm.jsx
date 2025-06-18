import { useState, useEffect } from "react";
import { Button } from "../../../components/Buttons/Button";
import { SelectInput } from "../../../components/Input/SelectInput";
import { LabelInput } from "../../../components/Input/LabelInput";
import { getFilmes } from '../../Filmes/services/filmeApi';
import { getSalas } from '../../Salas/services/salaApi';

export function SessaoForm({ id, filme = "", sala = "", horario = "", preco = "", idioma = "", formato = "", onSubmit, editando = false, onCancelarEdicao }) {
  const [formData, setFormData] = useState({
    filme,
    sala,
    horario,
    preco,
    idioma,
    formato
  });
  const [validated, setValidated] = useState(false);

  const [filmesOptions, setFilmesOptions] = useState([]);
  const [salasOptions, setSalasOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const filmes = await getFilmes();
        setFilmesOptions(filmes.map(f => ({ value: f.id, label: f.titulo })));
        const salas = await getSalas();
        setSalasOptions(salas.map(s => ({ value: s.id, label: s.nome })));
      } catch {
        setFilmesOptions([]);
        setSalasOptions([]);
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    if (editando) {
      setFormData({ filme, sala, horario, preco, idioma, formato });
    } else {
      setFormData({ filme: "", sala: "", horario: "", preco: "", idioma: "", formato: "" });
    }
  }, [filme, sala, horario, preco, idioma, formato, editando]);

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
        <SelectInput
          id="filme"
          label="Filme"
          value={formData.filme}
          onChange={handleChange}
          options={filmesOptions}
        />
        {validated && !formData.filme && (
          <div className="invalid-feedback">Selecione um filme.</div>
        )}
      </div>
      <div className="col-md-6">
        <SelectInput
          id="sala"
          label="Sala"
          value={formData.sala}
          onChange={handleChange}
          options={salasOptions}
        />
        {validated && !formData.sala && (
          <div className="invalid-feedback">Selecione uma sala.</div>
        )}
      </div>
      <div className="col-md-4">
        <LabelInput
          id="horario"
          label="Data e Hora"
          type="datetime-local"
          value={formData.horario}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Informe a data e hora.</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="preco" className="form-label">Preço</label>
        <div className="input-group">
          <span className="input-group-text">R$</span>
          <input
            type="number"
            className="form-control"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
            min={0}
            step={0.01}
          />
        </div>
        <div className="invalid-feedback">Informe o preço.</div>
      </div>
      <div className="col-md-2">
        <SelectInput
          id="idioma"
          label="Idioma"
          value={formData.idioma}
          onChange={handleChange}
          options={[
            { value: "Dublado", label: "Dublado" },
            { value: "Legendado", label: "Legendado" }
          ]}
        />
        {validated && !formData.idioma && (
          <div className="invalid-feedback">Selecione um idioma.</div>
        )}
      </div>
      <div className="col-md-2">
        <SelectInput
          id="formato"
          label="Formato"
          value={formData.formato}
          onChange={handleChange}
          options={[
            { value: "2D", label: "2D" },
            { value: "3D", label: "3D" }
          ]}
        />
        {validated && !formData.formato && (
          <div className="invalid-feedback">Selecione um formato.</div>
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
