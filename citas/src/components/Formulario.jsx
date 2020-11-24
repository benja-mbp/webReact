import React, { useState } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  /* Create State to dates. Use the name like the input, to use a technique */
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, actualizarError] = useState(false);

  /* Update state from input element. Run when users write in a input */
  const actualizarState = (e) => {
    /* Use state to update date */
    actualizarCita({
      /* Save copy of state */
      ...cita,
      /* Add state */
      [e.target.name]: e.target.value,
    });
  };

  // Extract values from dates
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // When users send form
  const submitCita = (e) => {
    e.preventDefault(); /* Por defecto el submit usa get con query parameters */

    /* Validate.  Trim delete blanks */
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    /* Delete previous error message */
    actualizarError(false);

    /* Assign an ID. Without DDBB use npm i uuid or shortid */
    cita.id = uuid();

    /* Create the date */
    crearCita(cita);

    /* Reset the form */
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <>
      <h2>Crear cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="sumbit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
