import React, { useState } from 'react';
import './ProjectCharterForm.css'; // Importar o arquivo CSS

const ProjectCharterForm = ({ onSave, onLoad }) => {
  const [formData, setFormData] = useState({
    nomeProjeto: '',
    descricaoProjeto: '',
    objetivosProjeto: '',
    criterioSucesso: ['', '', ''],
    participantes: [{ funcao: '', nome: '' }],
    recursos: [{ tipo: '', valor: '' }],
    riscos: ['', '', '', '', ''],
    cronograma: { abertura: '', informacoes: '', conceito: '', prototipagem: '', entrega: '' },
    aprovacao: { investidor: '', gerenteProjeto: '', gerenteFinanceiro: '', data: '', assinatura: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCriterioChange = (index, value) => {
    const newCriterios = [...formData.criterioSucesso];
    newCriterios[index] = value;
    setFormData({ ...formData, criterioSucesso: newCriterios });
  };

  const handleParticipantesChange = (index, field, value) => {
    const newParticipantes = [...formData.participantes];
    newParticipantes[index][field] = value;
    setFormData({ ...formData, participantes: newParticipantes });
  };

  const handleRecursosChange = (index, field, value) => {
    const newRecursos = [...formData.recursos];
    newRecursos[index][field] = value;
    setFormData({ ...formData, recursos: newRecursos });
  };

  const handleRiscoChange = (index, value) => {
    const newRiscos = [...formData.riscos];
    newRiscos[index] = value;
    setFormData({ ...formData, riscos: newRiscos });
  };

  const handleCronogramaChange = (field, value) => {
    const newCronograma = { ...formData.cronograma, [field]: value };
    setFormData({ ...formData, cronograma: newCronograma });
  };

  const handleAprovacaoChange = (field, value) => {
    const newAprovacao = { ...formData.aprovacao, [field]: value };
    setFormData({ ...formData, aprovacao: newAprovacao });
  };

  const addParticipante = () => {
    setFormData({
      ...formData,
      participantes: [...formData.participantes, { funcao: '', nome: '' }]
    });
  };

  const removeParticipante = (index) => {
    const newParticipantes = formData.participantes.filter((_, i) => i !== index);
    setFormData({ ...formData, participantes: newParticipantes });
  };

  const addRecurso = () => {
    setFormData({
      ...formData,
      recursos: [...formData.recursos, { tipo: '', valor: '' }]
    });
  };

  const removeRecurso = (index) => {
    const newRecursos = formData.recursos.filter((_, i) => i !== index);
    setFormData({ ...formData, recursos: newRecursos });
  };

  const addRisco = () => {
    setFormData({
      ...formData,
      riscos: [...formData.riscos, '']
    });
  };

  const removeRisco = (index) => {
    const newRiscos = formData.riscos.filter((_, i) => i !== index);
    setFormData({ ...formData, riscos: newRiscos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="project-charter-form">
      <form onSubmit={handleSubmit}>
        <h2>Termo de Abertura do Projeto – TAP (Project Charter)</h2>

        <label>
          Nome do Projeto:
          <input
            type="text"
            name="nomeProjeto"
            value={formData.nomeProjeto}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Descrição do Projeto:
          <input
            type="text"
            name="descricaoProjeto"
            value={formData.descricaoProjeto}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Objetivos do Projeto:
          <input
            type="text"
            name="objetivosProjeto"
            value={formData.objetivosProjeto}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Critério de Sucesso:
          {formData.criterioSucesso.map((criterio, index) => (
            <input
              key={index}
              type="text"
              value={criterio}
              onChange={(e) => handleCriterioChange(index, e.target.value)}
            />
          ))}
        </label>
        <br />

        <label>
          Participantes do Projeto:
          {formData.participantes.map((participante, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Função"
                value={participante.funcao}
                onChange={(e) =>
                  handleParticipantesChange(index, 'funcao', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Nome"
                value={participante.nome}
                onChange={(e) =>
                  handleParticipantesChange(index, 'nome', e.target.value)
                }
              />
              <button type="button" onClick={() => removeParticipante(index)}>Remover</button>
            </div>
          ))}
          <button type="button" onClick={addParticipante}>Adicionar Participante</button>
        </label>
        <br />

        <label>
          Recursos disponíveis:
          {formData.recursos.map((recurso, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Tipo"
                value={recurso.tipo}
                onChange={(e) =>
                  handleRecursosChange(index, 'tipo', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Valor"
                value={recurso.valor}
                onChange={(e) =>
                  handleRecursosChange(index, 'valor', e.target.value)
                }
              />
              <button type="button" onClick={() => removeRecurso(index)}>Remover</button>
            </div>
          ))}
          <button type="button" onClick={addRecurso}>Adicionar Recurso</button>
        </label>
        <br />

        <label>
          Riscos e Problemas Potenciais:
          {formData.riscos.map((risco, index) => (
            <div key={index}>
              <input
                type="text"
                value={risco}
                onChange={(e) => handleRiscoChange(index, e.target.value)}
              />
              <button type="button" onClick={() => removeRisco(index)}>Remover</button>
            </div>
          ))}
          <button type="button" onClick={addRisco}>Adicionar Risco</button>
        </label>
        <br />

        <label>
          Cronograma:
          <input
            type="text"
            placeholder="Abertura"
            value={formData.cronograma.abertura}
            onChange={(e) => handleCronogramaChange('abertura', e.target.value)}
          />
          <input
            type="text"
            placeholder="Informações"
            value={formData.cronograma.informacoes}
            onChange={(e) => handleCronogramaChange('informacoes', e.target.value)}
          />
          <input
            type="text"
            placeholder="Conceito"
            value={formData.cronograma.conceito}
            onChange={(e) => handleCronogramaChange('conceito', e.target.value)}
          />
          <input
            type="text"
            placeholder="Prototipagem"
            value={formData.cronograma.prototipagem}
            onChange={(e) => handleCronogramaChange('prototipagem', e.target.value)}
          />
          <input
            type="text"
            placeholder="Entrega"
            value={formData.cronograma.entrega}
            onChange={(e) => handleCronogramaChange('entrega', e.target.value)}
          />
        </label>
        <br />

        <label>
          Aprovação:
          <input
            type="text"
            placeholder="Investidor (Sponsor)"
            value={formData.aprovacao.investidor}
            onChange={(e) => handleAprovacaoChange('investidor', e.target.value)}
          />
          <input
            type="text"
            placeholder="Gerente de Projeto (Manager)"
            value={formData.aprovacao.gerenteProjeto}
            onChange={(e) => handleAprovacaoChange('gerenteProjeto', e.target.value)}
          />
          <input
            type="text"
            placeholder="Gerente Financeiro"
            value={formData.aprovacao.gerenteFinanceiro}
            onChange={(e) => handleAprovacaoChange('gerenteFinanceiro', e.target.value)}
          />
          <input
            type="text"
            placeholder="Data"
            value={formData.aprovacao.data}
            onChange={(e) => handleAprovacaoChange('data', e.target.value)}
          />
          <input
            type="text"
            placeholder="Assinatura"
            value={formData.aprovacao.assinatura}
            onChange={(e) => handleAprovacaoChange('assinatura', e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Salvar</button>
        <button type="button" onClick={onLoad}>Carregar Dados</button>
      </form>

      {/* Exibição de Dados */}
      <div className="project-charter-data">
        <h2>Dados do Projeto</h2>
        <table>
          <tbody>
            <tr>
              <td>Nome do Projeto:</td>
              <td>{formData.nomeProjeto}</td>
            </tr>
            <tr>
              <td>Descrição do Projeto:</td>
              <td>{formData.descricaoProjeto}</td>
            </tr>
            <tr>
              <td>Objetivos do Projeto:</td>
              <td>{formData.objetivosProjeto}</td>
            </tr>
            <tr>
              <td>Critério de Sucesso:</td>
              <td>
                <ul>
                  {formData.criterioSucesso.map((criterio, index) => (
                    <li key={index}>{criterio}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Participantes do Projeto:</td>
              <td>
                <ul>
                  {formData.participantes.map((participante, index) => (
                    <li key={index}>
                      {participante.funcao} - {participante.nome}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Recursos disponíveis:</td>
              <td>
                <ul>
                  {formData.recursos.map((recurso, index) => (
                    <li key={index}>
                      {recurso.tipo}: {recurso.valor}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Riscos e Problemas Potenciais:</td>
              <td>
                <ul>
                  {formData.riscos.map((risco, index) => (
                    <li key={index}>{risco}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Cronograma:</td>
              <td>
                <ul>
                  <li>Abertura: {formData.cronograma.abertura}</li>
                  <li>Informações: {formData.cronograma.informacoes}</li>
                  <li>Conceito: {formData.cronograma.conceito}</li>
                  <li>Prototipagem: {formData.cronograma.prototipagem}</li>
                  <li>Entrega: {formData.cronograma.entrega}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Aprovação:</td>
              <td>
                <ul>
                  <li>Investidor: {formData.aprovacao.investidor}</li>
                  <li>Gerente de Projeto: {formData.aprovacao.gerenteProjeto}</li>
                  <li>Gerente Financeiro: {formData.aprovacao.gerenteFinanceiro}</li>
                  <li>Data: {formData.aprovacao.data}</li>
                  <li>Assinatura: {formData.aprovacao.assinatura}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectCharterForm;
