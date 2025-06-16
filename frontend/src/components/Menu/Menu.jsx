import { Link } from 'react-router-dom';

export function Menu () {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🎬 CineTech</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/filmes">Filmes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/salas">Salas</Link>
          </li>
                    <li className="nav-item">
            <Link className="nav-link" to="/sessoes">Sessões</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ingressos">Ingressos</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};
