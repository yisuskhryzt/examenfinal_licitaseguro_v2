import { useState } from 'react';

const Proveedores = () => {
  const [rut, setRut] = useState('');
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'AC3A098B-4CD0-41AF-81A5-41284248419B';

  const formatRut = (rut) => {
    // Remover puntos y guiones
    const cleanRut = rut.replace(/[.-]/g, '');
    
    // Si tiene 8 o 9 dígitos, formatear como xx.xxx.xxx-x
    if (cleanRut.length >= 8) {
      const rutNumber = cleanRut.slice(0, -1);
      const dv = cleanRut.slice(-1);
      
      // Agregar puntos
      const formattedNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      return `${formattedNumber}-${dv}`;
    }
    
    return rut;
  };

  const handleRutChange = (e) => {
    const value = e.target.value;
    const formatted = formatRut(value);
    setRut(formatted);
  };

  const buscarProveedor = async () => {
    if (!rut.trim()) {
      setError('Por favor ingresa un RUT');
      return;
    }

    setLoading(true);
    setError('');
    setProveedor(null);

    try {
      const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Listado && data.Listado.length > 0) {
        setProveedor(data.Listado[0]);
      } else {
        setError('No se encontró información para el RUT ingresado');
      }
    } catch (error) {
      console.error('Error al buscar proveedor:', error);
      setError('Error al buscar el proveedor. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarProveedor();
  };

  return (
    <div className="container py-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="section-title text-center">Búsqueda de Proveedores</h1>
          
          {/* Formulario de Búsqueda */}
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label">RUT del Proveedor</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej: 12.345.678-9"
                      value={rut}
                      onChange={handleRutChange}
                      maxLength="12"
                    />
                    <div className="form-text">
                      Formato automático: xx.xxx.xxx-x
                    </div>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn btn-primary-custom w-100"
                      disabled={loading}
                    >
                      {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center">
              <div className="loading-spinner"></div>
              <p>Buscando proveedor...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="alert alert-warning text-center">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Resultado */}
          {proveedor && !loading && (
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-building me-2"></i>
                  Información del Proveedor
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>RUT:</strong>
                    <p className="mb-2">{proveedor.RutSucursal || 'No disponible'}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Nombre/Razón Social:</strong>
                    <p className="mb-2">{proveedor.Nombre || 'No disponible'}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Giro:</strong>
                    <p className="mb-2">{proveedor.Giro || 'No disponible'}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Estado:</strong>
                    <p className="mb-2">
                      <span className={`badge ${proveedor.EstadoRegistro === 'Vigente' ? 'bg-success' : 'bg-warning'}`}>
                        {proveedor.EstadoRegistro || 'No disponible'}
                      </span>
                    </p>
                  </div>
                  {proveedor.FechaCreacion && (
                    <div className="col-md-6">
                      <strong>Fecha de Registro:</strong>
                      <p className="mb-2">
                        {new Date(proveedor.FechaCreacion).toLocaleDateString('es-CL')}
                      </p>
                    </div>
                  )}
                  {proveedor.DireccionPostal && (
                    <div className="col-12">
                      <strong>Dirección:</strong>
                      <p className="mb-2">{proveedor.DireccionPostal}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="mt-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h6 className="card-title">ℹ️ Información</h6>
                <p className="card-text small mb-0">
                  Los datos son obtenidos en tiempo real desde el registro oficial de Mercado Público de Chile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;