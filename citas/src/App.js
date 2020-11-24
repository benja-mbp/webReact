import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  /* Dates from local storage */
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  } /* If there are not dates, start with empty array */

  /* Array of dates */
  const [citas, guardarCitas] = useState(citasIniciales);

  /* Use Effect to realize some operations when state change */
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  /* Takes existing dates and add new date */
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  /* Delete a date by ID */
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  /* Conditional message */
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus Citas";

  return (
    <>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            {" "}
            {/* Skeleton syntax */}
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
