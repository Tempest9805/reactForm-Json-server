import React, { useState, useEffect } from "react";
import FormularioComentario from "./components/FormularioComentario";
import ListaComentarios from "./components/ListaComentarios";

function App() {
  // Estado que guarda todos los comentarios
  const [comentarios, setComentarios] = useState([]);
  // Para saber si estamos "cargando" o si hubo error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1) Al iniciar, bajamos todos los comentarios desde el servidor (que tiene que estar levantado acuerdese)
  useEffect(() => {
    const fetchInicial = async () => { // a esto se le llama promesa basicamente espera que el server le conteste y hasta que no le contesta no hace nada
      setIsLoading(true); // le dice que esta cargando mientras espera la respuesta del server
      try {
        const resp = await fetch("http://localhost:3001/comentarios");
        if (!resp.ok) {
          throw new Error(`Error: ${resp.status}`);
        }
        const datos = await resp.json();
        setComentarios(datos); // Guardamos el arreglo en el estado con el contenido del form
        setError(null);
      } catch (err) { // esto agarra el error en el aire y tira el mensaje de No se pudieron cargar los comentarios. si no funka
        console.error(err);
        setError("No se pudieron cargar los comentarios.");
      } finally {
        setIsLoading(false); // esto le dice que ya no esta cargando
      }
    };

    fetchInicial();
  }, []);

  // 2) Función para agregar un comentario
  const agregarComentario = async (nuevoComentario) => {
    try {
      const resp = await fetch("http://localhost:3001/comentarios", { // Aca ud cambia dependiendo del endpoint que ocupe como los otros que tenia
        method: "POST", // el post le dice al server que actulice la info que le vamos a enviar desde aca
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoComentario),// esto le da formato de json
      });
      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }
      const comentarioCreado = await resp.json();
      // Lo agregamos al array local
      setComentarios((prev) => [...prev, comentarioCreado]);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  // 3) Función para borrar todos los comentarios
  const clearComentarios = async () => {
    if (comentarios.length === 0) return;
    try {
      // Hacemos DELETE por cada comentario para eso tienen un id 
      const borrados = comentarios.map((c) =>
        fetch(`http://localhost:3001/comentarios/${c.id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(borrados); // esto es otro ej de promesa donde el mae espera que le contesten o no hace nada xd
      // Vaciamos el array local
      setComentarios([]);
    } catch (err) {
      console.error(err);
      alert("No se pudieron borrar todos los comentarios.");
    }
  };
// aca puede tener otro archivo para los estilos y ponerle clases en lugar usar style={{ padding: "1rem" }} que es bien kk
  return (
    <div className="App" style={{ padding: "1rem" }}> 
      {/* Formulario recibe la función para agregar */}
      <FormularioComentario onAgregar={agregarComentario} />

      {/* Botón para borrar todo */}
      <div style={{ margin: "1.5rem 0", textAlign: "center" }}>
        <button
          onClick={clearComentarios}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Limpiar JSON (borrar todos)
        </button>
      </div>

      {/* Si está cargando, mostramos mensaje; si hay error, otro texto; si no, la tabla */}
      {isLoading ? (
        <p>Cargando comentarios...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ListaComentarios comentarios={comentarios} />
      )}
    </div>
  );
}

export default App;
