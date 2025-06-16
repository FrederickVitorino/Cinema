import React, { useEffect, useState } from 'react';
import { LabelInput } from '../../../components/Input/LabelInput';
import { SelectInput } from '../../../components/Input/SelectInput';
import { Button } from '../../../components/buttons/Button';
import { useLocation } from 'react-router-dom';
import { getSessoes } from '../../Sessoes/services/sessaoApi';
import { createIngresso } from '../services/ingressoApi';

export function IngressosPage() {
  const [sessoes, setSessoes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    assento: '',
    sessao: '',
    pagamento: '',
  });
  const location = useLocation();
  const [validated, setValidated] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchSessoes() {
      try {
        const data = await getSessoes();
        setSessoes(data);
        const params = new URLSearchParams(location.search);
        const vendaSessao = params.get('vendaSessao');
        if (vendaSessao && data.some(s => String(s.id) === String(vendaSessao))) {
          setForm(f => ({ ...f, sessao: vendaSessao }));
        }
      } catch {
        setErro('Erro ao carregar sessões do backend');
      }
    }
    fetchSessoes();
  }, [location.search]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome || !form.cpf || !form.assento || !form.sessao || !form.pagamento) {
      setValidated(true);
      return;
    }
    setErro("");
    try {
      await createIngresso({
        nome: form.nome,
        cpf: form.cpf,
        sessaoId: Number(form.sessao),
        assento: form.assento,
        formaPagamento: form.pagamento,
      });
      alert('Venda realizada com sucesso!');
      setForm({ nome: '', cpf: '', assento: '', sessao: '', pagamento: '' });
      setValidated(false);
    } catch {
      setErro('Erro ao registrar ingresso no backend');
    }
  }

  return (
    <>
        <h4>Ingressos</h4>
        <hr />
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form className={`row g-3 needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-12 col-sm-6">
            <LabelInput
              id="nome"
              label="Nome do Cliente"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <SelectInput
              id="sessao"
              label="Sessão"
              value={form.sessao}
              onChange={handleChange}
              required
              options={sessoes.map(sessao => ({
                value: sessao.id,
                label: `${sessao.filme && typeof sessao.filme === 'object' ? sessao.filme.titulo : sessao.filme} - Sala ${sessao.sala && typeof sessao.sala === 'object' ? sessao.sala.nome : sessao.sala} - ${sessao.dataHora ? new Date(sessao.dataHora).toLocaleString('pt-BR') : sessao.horario} - R$ ${Number(sessao.preco).toFixed(2)}`
              }))}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <LabelInput
              id="cpf"
              label="CPF"
              type="number"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Insira apenas números"
              required
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <LabelInput
              id="assento"
              label="Assento"
              value={form.assento}
              onChange={handleChange}
              placeholder="Ex: A1"
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <SelectInput
              id="pagamento"
              label="Forma de pagamento"
              value={form.pagamento}
              onChange={handleChange}
              required
              options={[
                { value: 'Débito', label: 'Cartão de Débito' },
                { value: 'Crédito', label: 'Cartão de Crédito' },
                { value: 'PIX', label: 'PIX' },
                { value: 'Dinheiro', label: 'Dinheiro' },
              ]}
            />
          </div>
        </div>
        <div className="col-auto">
          <Button text="Confirmar Venda" variant="success" type="submit" />
        </div>
      </form>
    </>
  );
}
