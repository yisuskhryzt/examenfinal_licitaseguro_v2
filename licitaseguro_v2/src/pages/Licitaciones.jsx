import { useState, useEffect } from 'react';
import LicitacionModal from '../components/LicitacionModal';


const Licitaciones = () => {
  const [licitaciones, setLicitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');
  const [selectedLicitacion, setSelectedLicitacion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const API_KEY = 'AC3A098B-4CD0-41AF-81A5-41284248419B';
  const estados = ['publicada', 'cerrada', 'adjudicada', 'desierta', 'revocada'];

  // Mapeo de estados numéricos a texto
  const estadosMap = {
    '5': 'Publicada',
    '6': 'Cerrada',
    '7': 'Desierta',
    '8': 'Adjudicada',
    '9': 'Revocada'
  };

  const formatFecha = (fecha) => {
    return fecha.split('-').reverse().join('');
  };

  const fetchLicitaciones = async () => {
    if (!fecha || !estado) {
      alert('Por favor selecciona una fecha y un estado');
      return;
    }

    setLoading(true);
    setCurrentPage(1); // Reset pagination when fetching new data
    try {
      const fechaFormateada = formatFecha(fecha);
      const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fechaFormateada}&estado=${estado}&ticket=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setLicitaciones(data.Listado || []);
    } catch (error) {
      console.error('Error al cargar licitaciones:', error);
      alert('Error al cargar las licitaciones. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalle = (codigo) => {
    setSelectedLicitacion(codigo);
    setShowModal(true);
  };

  const getEstadoBadgeClass = (estado) => {
    const classes = {
      'Publicada': 'bg-primary',
      'Cerrada': 'bg-secondary',
      'Adjudicada': 'bg-success',
      'Desierta': 'bg-warning text-dark',
      'Revocada': 'bg-danger'
    };
    return classes[estado] || 'bg-secondary';
  };

  // Paginación
  const totalPages = Math.ceil(licitaciones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLicitaciones = licitaciones.slice(startIndex, endIndex);

  // Generar números de página (máximo 5)
  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-4 fade-in">
      <div className="row">
        <div className="col-12">
          <h1 className="section-title text-center">Licitaciones Públicas</h1>
          
          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Filtros de Búsqueda</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Fecha *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Estado *</label>
                  <select
                    className="form-select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar estado</option>
                    {estados.map(est => (
                      <option key={est} value={est}>
                        {est.charAt(0).toUpperCase() + est.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Items por página</label>
                  <select
                    className="form-select"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <button
                    className="btn btn-primary-custom w-100"
                    onClick={fetchLicitaciones}
                    disabled={loading}
                  >
                    {loading ? 'Buscando...' : 'Buscar Licitaciones'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Controles de vista */}
          {!loading && licitaciones.length > 0 && (
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="me-3">Mostrando {currentLicitaciones.length} de {licitaciones.length} licitaciones</span>
                  </div>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <i className="bi bi-grid-3x3-gap"></i> Cuadrícula
                    </button>
                    <button
                      type="button"
                      className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <i className="bi bi-list-ul"></i> Lista
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center">
              <div className="loading-spinner"></div>
              <p>Cargando licitaciones...</p>
            </div>
          )}

          {/* Resultados */}
          {!loading && currentLicitaciones.length > 0 && (
            <>
              {viewMode === 'grid' ? (
                <div className="row g-3">
                  {currentLicitaciones.map((licitacion) => (
                    <div key={licitacion.CodigoExterno} className="col-md-6 col-lg-3">
                      <div className="card h-100 card-hover">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title text-truncate me-2" style={{fontSize: '0.9rem'}}>
                              {licitacion.Nombre}
                            </h6>
                            <span className={`badge status-badge ${getEstadoBadgeClass(estadosMap[licitacion.CodigoEstado] || licitacion.CodigoEstado)}`}>
                              {estadosMap[licitacion.CodigoEstado] || licitacion.CodigoEstado}
                            </span>
                          </div>
                          
                          <p className="text-muted small mb-2">
                            <strong>Código:</strong> {licitacion.CodigoExterno}
                          </p>
                          
                          <p className="text-muted small mb-2">
                            <strong>Organismo:</strong> {licitacion.Organismo?.Nombre}
                          </p>
                          
                          {licitacion.FechaCierre && (
                            <p className="text-muted small mb-3">
                              <strong>Cierre:</strong> {new Date(licitacion.FechaCierre).toLocaleDateString('es-CL')}
                            </p>
                          )}
                          
                          <button
                            className="btn btn-outline-primary btn-sm w-100"
                            onClick={() => handleVerDetalle(licitacion.CodigoExterno)}
                          >
                            Ver Detalle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Organismo</th>
                            <th>Estado</th>
                            <th>Fecha Cierre</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentLicitaciones.map((licitacion) => (
                            <tr key={licitacion.CodigoExterno}>
                              <td>
                                <div className="text-truncate" style={{maxWidth: '250px'}}>
                                  {licitacion.Nombre}
                                </div>
                              </td>
                              <td>{licitacion.CodigoExterno}</td>
                              <td>
                                <div className="text-truncate" style={{maxWidth: '200px'}}>
                                  {licitacion.Organismo?.Nombre}
                                </div>
                              </td>
                              <td>
                                <span className={`badge status-badge ${getEstadoBadgeClass(estadosMap[licitacion.CodigoEstado] || licitacion.CodigoEstado)}`}>
                                  {estadosMap[licitacion.CodigoEstado] || licitacion.CodigoEstado}
                                </span>
                              </td>
                              <td>
                                {licitacion.FechaCierre ? 
                                  new Date(licitacion.FechaCierre).toLocaleDateString('es-CL') : 
                                  '-'
                                }
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => handleVerDetalle(licitacion.CodigoExterno)}
                                >
                                  Ver Detalle
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Anterior &laquo;
                        </button>
                      </li>
                      
                      {getPageNumbers().map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          &raquo; Siguiente
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}

          {!loading && licitaciones.length === 0 && fecha && estado && (
            <div className="text-center py-5">
              <div className="text-muted">
                <i className="bi bi-search fs-1 mb-3 d-block"></i>
                <h5>No se encontraron licitaciones</h5>
                <p>No hay licitaciones para los filtros seleccionados.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      <LicitacionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        codigoLicitacion={selectedLicitacion}
      />
    </div>
  );
};

export default Licitaciones;