import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Transparencia en Licitaciones Públicas
              </h1>
              <p className="lead mb-4">
                Accede de forma fácil y transparente a todas las licitaciones públicas de Chile. 
                Consulta, filtra y encuentra la información que necesitas.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/licitaciones" className="btn btn-light btn-lg px-4">
                  Ver Licitaciones
                </Link>
                <Link to="/proveedores" className="btn btn-outline-light btn-lg px-4">
                  Buscar Proveedores
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-white bg-opacity-10 rounded-3 p-4 mt-4 mt-lg-0">
                <h3 className="h4">Portal Oficial</h3>
                <p className="mb-0">Datos en tiempo real desde Mercado Público</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center section-title">¿Qué puedes hacer?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 card-hover text-center p-4">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <i className="bi bi-search fs-1"></i>
                  </div>
                  <h5 className="card-title">Consultar Licitaciones</h5>
                  <p className="card-text">
                    Navega por el listado completo de licitaciones disponibles, 
                    con filtros por fecha y estado.
                  </p>
                  <Link to="/licitaciones" className="btn btn-primary-custom">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 card-hover text-center p-4">
                <div className="card-body">
                  <div className="text-success mb-3">
                    <i className="bi bi-file-text fs-1"></i>
                  </div>
                  <h5 className="card-title">Detalles Completos</h5>
                  <p className="card-text">
                    Accede a información detallada de cada licitación, 
                    incluyendo fechas, descripción y estado actual.
                  </p>
                  <Link to="/licitaciones" className="btn btn-primary-custom">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 card-hover text-center p-4">
                <div className="card-body">
                  <div className="text-info mb-3">
                    <i className="bi bi-building fs-1"></i>
                  </div>
                  <h5 className="card-title">Buscar Proveedores</h5>
                  <p className="card-text">
                    Encuentra información de proveedores registrados 
                    utilizando su RUT de empresa.
                  </p>
                  <Link to="/proveedores" className="btn btn-primary-custom">
                    Buscar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="mb-3">
                <h3 className="display-4 fw-bold text-primary">100%</h3>
                <p className="text-muted">Transparente</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h3 className="display-4 fw-bold text-success">24/7</h3>
                <p className="text-muted">Disponible</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <h3 className="display-4 fw-bold text-info">Oficial</h3>
                <p className="text-muted">Datos Verificados</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;