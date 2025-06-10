import { useState, useEffect } from 'react';

const LicitacionModal = ({ show, onHide, codigoLicitacion }) => {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'AC3A098B-4CD0-41AF-81A5-41284248419B';

  useEffect(() => {
    if (show && codigoLicitacion) {
      fetchDetalle();
    }
  }, [show, codigoLicitacion]);

  const fetchDetalle = async () => {
    setLoading(true);
    setError('');
    setDetalle(null);

    try {
      const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigoLicitacion}&ticket=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Listado && data.Listado.length > 0) {
        setDetalle(data.Listado[0]);
      } else {
        setError('No se encontró información para esta licitación');
      }
    } catch (error) {
      console.error('Error al cargar detalle:', error);
      setError('Error al cargar el detalle de la licitación');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-CL');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('es-CL')} ${date.toLocaleTimeString('es-CL')}`;
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-file-text me-2"></i>
              Detalle de Licitación
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onHide}
            ></button>
          </div>
          
          <div className="modal-body">
            {loading && (
              <div className="text-center py-4">
                <div className="loading-spinner"></div>
                <p>Cargando detalle...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {detalle && !loading && (
              <div className="row g-3">
                <div className="col-md-6">
                  <strong>ID:</strong>
                  <p className="mb-3">{detalle.CodigoExterno}</p>
                </div>
                
                <div className="col-md-6">
                  <strong>Estado:</strong>
                  <p className="mb-3">
                    <span className={`badge ${
                      detalle.CodigoEstado === 'publicada' ? 'bg-primary' :
                      detalle.CodigoEstado === 'cerrada' ? 'bg-secondary' :
                      detalle.CodigoEstado === 'adjudicada' ? 'bg-success' :
                      detalle.CodigoEstado === 'desierta' ? 'bg-warning text-dark' :
                      'bg-danger'
                    }`}>
                      {detalle.CodigoEstado}
                    </span>
                  </p>
                </div>
                
                <div className="col-md-6">
                  <strong>Fecha de Publicación:</strong>
                  <p className="mb-3">{formatDate(detalle.FechaPublicacion)}</p>
                </div>
                
                <div className="col-md-6">
                  <strong>Fecha de Cierre:</strong>
                  <p className="mb-3">{formatDateTime(detalle.FechaCierre)}</p>
                </div>
                
                <div className="col-12">
                  <strong>Descripción:</strong>
                  <div className="border rounded p-3 bg-light mt-2">
                    <p className="mb-0">
                      {detalle.Descripcion || detalle.Nombre || 'No hay descripción disponible'}
                    </p>
                  </div>
                </div>

                {detalle.Organismo && (
                  <div className="col-12 mt-3">
                    <strong>Organismo:</strong>
                    <p className="mb-0">{detalle.Organismo.Nombre}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicitacionModal;