import { Button } from "../../../components/buttons/Button";

export function SalasTable({ salas, onEditar, onExcluir }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered border-secondary" id="tabela-salas">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome da Sala</th>
            <th scope="col">Capacidade</th>
            <th scope="col">Tipo da Sala</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {salas.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">Nenhuma sala cadastrada.</td>
            </tr>
          ) : (
            salas.map((sala) => {
              if (!sala.id) return null;
              return (
                <tr key={sala.id}>
                  <td>{sala.id}</td>
                  <td>{sala.nome}</td>
                  <td>{sala.capacidade}</td>
                  <td>{sala.tipo}</td>
                  <td>
                    <Button text=" Editar" variant="warning" size="sm" icon="pencil" onClick={() => onEditar && onEditar(sala.id)} />
                  </td>
                  <td>
                    <Button text=" Excluir" variant="danger" size="sm" icon="trash" onClick={() => onExcluir && onExcluir(sala.id)} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
