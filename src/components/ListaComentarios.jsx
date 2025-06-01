import React from "react";

const ListaComentarios = ({ comentarios }) => {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontWeigh: "bold", color: "green" }}>Me debe un Helado :3 </h2>
            {comentarios.length === 0 ? (
                <p>No hay comentarios registrados.</p>
            ) : (
                <table
                //lo mismo use clases en un archivo aparte bien bonito, no lo haga como yo (tenia pereza)
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "1rem",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Nombre</th>
                            <th style={thStyle}>Correo</th>
                            <th style={thStyle}>Comentario</th>
                            <th style={thStyle}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comentarios.map((c) => ( 
 //comentarios es un arreglo de objetos: cada objeto tiene propiedades como id, nombre, correo, comentario y fecha
// .map(...) toma ese arreglo y, para cada elemento c (cada comentario), devuelve un bloque de JSX que representa una fila (<tr>) de la tabla.
//esto basicamente le pone las filas a la tabla en base a lo que tenga el json
                            <tr key={c.id}>
{/* Cada fila necesita un atributo key único para que React identifique correctamente cada elemento al actualizar la lista. */}
{/* Aquí usamos c.id (el número identificador que JSON Server asigna a cada comentario). */}

                                <td style={tdStyle}>{c.id}</td>
                                <td style={tdStyle}>{c.nombre}</td>
                                <td style={tdStyle}>{c.correo}</td>
                                <td style={tdStyle}>{c.comentario}</td>
                                <td style={tdStyle}>
                                    {c.fecha //esto verifica si hay fecha
                                        ? new Date(c.fecha).toLocaleString("es-ES", { //esto le pone la fecha bonito
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const thStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem",
    textAlign: "left",
    background: "#f0f0f0",
};

const tdStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem",
};

export default ListaComentarios; 
