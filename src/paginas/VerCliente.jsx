import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
        setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  console.log(cargando);

  const { nombre, email, telefono, empresa, notas } = cliente;

  return (
    <div>
      {cargando ? (
        <Spinner />
      ) : Object.keys(cliente).length === 0 ? (
        <p>No hay resultados</p>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente: {nombre}
          </h1>
          <p className="mt-3">Información del Cliente</p>

          {nombre && (
            <p className="text-gray-600 text-4xl mt-10">
              <span className="text-gray-800 uppercase font-bold">
                Cliente:{" "}
              </span>
              {nombre}
            </p>
          )}
          {email && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">Email: </span>
              {email}
            </p>
          )}
          {telefono && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Teléfono:{" "}
              </span>
              {telefono}
            </p>
          )}
          {empresa && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Empresa:{" "}
              </span>
              {empresa}
            </p>
          )}
          {notas && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">Notas: </span>
              {notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;
