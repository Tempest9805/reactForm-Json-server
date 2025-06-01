import React, { useState } from "react";
// aca pusimos el hook de useState("") para guardar datos que cambian a lo largo de la vida del componente y, cuando cambian, obligan a React a volver a “pintar” la interfaz para que se actualice sin recargar el sitio :v
const FormularioComentario = ({ onAgregar }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [comentario, setComentario] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);
        setError(null);

        // Validación básica: que no estén vacíos
        if (!nombre.trim() || !correo.trim() || !comentario.trim()) {
            setError("Por favor completa todos los campos.");
            return;
        }

        // Preparamos el objeto con la fecha dentro
        const nuevoComentario = {
            nombre: nombre.trim(),
            correo: correo.trim(),
            comentario: comentario.trim(),
            fecha: new Date().toISOString(),
        };

        // Llamamos a la función que nos pasó App.js
        const resultado = await onAgregar(nuevoComentario);

        if (resultado.success) {
            // Si todo salió bien, mostramos un mensajito y limpiamos campos
            setFeedback("¡Comentario enviado exitosamente!");
            setError(null);
            setNombre("");
            setCorreo("");
            setComentario("");
        } else {
            // Si hubo error, lo mostramos aquí
            setError("No se pudo enviar. " + (resultado.message || ""));
            setFeedback(null);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Comente</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "0.8rem" }}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} // Al cambiar nombre, React vuelve a renderizar y coloca el nuevo valor en value={nombre} lo mismo pal resto
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div style={{ marginBottom: "0.8rem" }}>
                    <label htmlFor="correo">Correo:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <div style={{ marginBottom: "0.8rem" }}>
                    <label htmlFor="comentario">Comentario:</label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        rows="4"
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                </div>
                <button type="submit" style={{ padding: "0.6rem 1.2rem" }}>
                    Enviar
                </button>
            </form>

            {feedback && (
                <p style={{ color: "green", marginTop: "1rem" }}>{feedback}</p>
            )}
            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </div>
    );
};

export default FormularioComentario;
