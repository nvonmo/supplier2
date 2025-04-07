
import { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';

export default function Home() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [proveedor, setProveedor] = useState("");
  const [articulo, setArticulo] = useState("");
  const [uso, setUso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const users = { admin: 'clave123', juan: 'test123' };  // Simple user list

  const handleLogin = () => {
    if (users[user] === pass) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleSubmit = () => {
    setError("");
    
    if (!proveedor || !articulo || !uso) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    
    let clasificacion = "";
    let justificacion = "";

    // Classify automatically based on usage
    if (uso === "cuarto limpio") {
      clasificacion = "GMP";
      justificacion = "Cumple con los requisitos de Buenas Prácticas de Manufactura (GMP) para uso en cuarto limpio.";
    } else {
      if (uso === "esterilización") {
        clasificacion = "A";
        justificacion = "Outsourcing crítico de esterilización, cumple con los requisitos GMP según la NOM 241 y MDSAP.";
      } else if (articulo === "hebra" || articulo === "aguja" || articulo === "malla") {
        clasificacion = "B";
        justificacion = "Componente directo para productos médicos, cumple con GMP según ISO 13485.";
      } else if (articulo === "soporte" || articulo === "opalina" || articulo === "sobre") {
        clasificacion = "C1";
        justificacion = "Materia prima para empaque primario, cumple con los estándares de GMP según NOM 241.";
      } else if (articulo === "caja" || articulo === "funda") {
        clasificacion = "C2";
        justificacion = "Materia prima para empaque secundario, cumple con los estándares de GMP según MDSAP.";
      } else {
        clasificacion = "G2";
        justificacion = "Proveedor no cumple con los requisitos establecidos para GMP, no se clasifica bajo control de SGC.";
      }
    }

    setResultado({
      clasificacion: clasificacion,
      justificacion: justificacion + " Cumple con los requisitos de Buenas Prácticas de Manufactura (GMP)."
    });
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <h2>Inicia sesión</h2>
          <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
          <Input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" />
          <Button onClick={handleLogin}>Login</Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      ) : (
        <div>
          <h1>Bienvenido a la aplicación de clasificación de proveedores</h1>
          <Input value={proveedor} onChange={(e) => setProveedor(e.target.value)} placeholder="Proveedor" />
          <Input value={articulo} onChange={(e) => setArticulo(e.target.value)} placeholder="Artículo" />
          <Input value={uso} onChange={(e) => setUso(e.target.value)} placeholder="Uso" />
          <Button onClick={handleSubmit}>Clasificar</Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {resultado && (
            <div>
              <h3>Resultado de Clasificación:</h3>
              <p><strong>Clasificación:</strong> {resultado.clasificacion}</p>
              <p><strong>Justificación:</strong> {resultado.justificacion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
    