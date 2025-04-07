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

    // 1. Si el uso es "cuarto limpio", clasificamos como GMP
    if (uso === "cuarto limpio") {
      clasificacion = "GMP";
      justificacion = "Cumple con los requisitos de Buenas Prácticas de Manufactura (GMP) para uso en cuarto limpio.";
    } else {
      // 2. Si el artículo es relacionado con equipos médicos o esterilización, se clasifica como A o B
      if (articulo === "equipo" || articulo === "esterilización" || articulo === "equipo para imprimir en producto") {
        clasificacion = "A";
        justificacion = "Cumple con los requisitos de GMP según la NOM 241 y MDSAP, para equipos médicos o procesos críticos.";
      }
      // 3. Clasificación basada en tipo de artículo
      else if (articulo === "hebra" || articulo === "aguja" || articulo === "malla") {
        clasificacion = "B";
        justificacion = "Componente directo para productos médicos, cumple con GMP según ISO 13485.";
      } else if (articulo === "soporte" || articulo === "opalina
    
