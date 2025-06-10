const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="fw-bold">🏛️ LicitaSeguro</h5>
            <p className="mb-0">
              Facilitando información transparente y accesible sobre licitaciones públicas en Chile.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">
              <small>© {new Date().getFullYear()} LicitaSeguro. Todos los derechos reservados.</small>
            </p>
            <p className="mb-0">
              <small>Datos proporcionados por Mercado Público de Chile</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;