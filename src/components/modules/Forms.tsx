'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Definir los tipos
type Departamento = 'Bogotá' | 'Antioquia' | 'Cundinamarca';

const departamentos: Departamento[] = ['Bogotá', 'Antioquia', 'Cundinamarca'];
const ciudades: Record<Departamento, string[]> = {
  Bogotá: ['Bogotá D.C.'],
  Antioquia: ['Medellín', 'Envigado'],
  Cundinamarca: ['Soacha', 'Chía']
};

// Función para generar un código alfanumérico
const generateCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Tipos para los datos del formulario
type FormData = {
  nombre: string;
  apellido: string;
  cedula: string;
  departamento: Departamento;
  ciudad: string;
  celular: string;
  correo: string;
  habeasData: boolean;
};

export default function Forms() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [selectedDepartamento, setSelectedDepartamento] = useState<Departamento | ''>('');
  const [code, setCode] = useState('');
  const [data, setData] = useState<FormData>();

  // Función para manejar el formulario
  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    const newCode = generateCode();
    setCode(newCode);
    setData(data);
  }; 

  // Función para manejar el cambio de departamento
  const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartamento(e.target.value as Departamento);
  };

  return (
    <div className="container-xxl mx-auto p-0 row">
      <div className={code==''?"col-6 p-3 active":'disable'}>
        <h1>Registro al Sorteo</h1>
        <form className='row g-3' onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="col-6">
            <label className="form-label">Nombre:</label>
            <input 
              className={errors.nombre ? "form-control Invali" : "form-control"} 
              type='text' 
              {...register('nombre', { required: true, pattern: /^[A-Za-z]+$/i })} 
            />
            {errors.nombre && <p className='text-danger'>El nombre es obligatorio y debe contener solo letras.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Apellido:</label>
            <input 
              className={errors.apellido ? "form-control Invali" : "form-control"} 
              {...register('apellido', { required: true, pattern: /^[A-Za-z]+$/i })} 
            />
            {errors.apellido && <p className='text-danger'>El apellido es obligatorio y debe contener solo letras.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Cédula:</label>
            <input 
              className={errors.cedula ? "form-control Invali" : "form-control"} 
              type='number' 
              {...register('cedula', { required: true, pattern: /^[0-9]+$/ })} 
            />
            {errors.cedula && <p className='text-danger'>La cédula es obligatoria y debe contener solo números.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Departamento:</label>
            <select 
              className={errors.departamento ? "form-select Invali" : "form-select"} 
              {...register('departamento', { required: true })} 
              onChange={handleDepartamentoChange}
            >
              <option value="">Seleccione un departamento</option>
              {
                
departamentos.map
(depto => (
                  <option key={depto} value={depto}>{depto}</option>
                ))
              }
            </select>
            {errors.departamento && <p className='text-danger'>Seleccione un departamento.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Ciudad:</label>
            <select 
              className={errors.ciudad ? "form-select Invali" : "form-select"} 
              {...register('ciudad', { required: true })}
            >
              <option value="">Seleccione una ciudad</option>
              {selectedDepartamento && ciudades[selectedDepartamento as Departamento].map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
            {errors.ciudad && <p className='text-danger'>Seleccione una ciudad.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Celular:</label>
            <input 
              className={errors.celular ? "form-control Invali" : "form-control"} 
              type='number' 
              {...register('celular', { required: true, pattern: /^[0-9]+$/ })} 
            />
            {errors.celular && <p className='text-danger'>El celular es obligatorio y debe contener solo números.</p>}
          </div>
          <div className="col-6">
            <label className="form-label">Correo Electrónico:</label>
            <input 
              className={errors.correo ? "form-control Invali" : "form-control"} 
              {...register('correo', { required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })} 
            />
            {errors.correo && <p className='text-danger'>El correo es obligatorio y debe contener un formato válido.</p>}
          </div>
          <div className="col-6">
            <label className={errors.habeasData ? "form-check-label Invali-Label" : "form-check-label"}>
              <input 
                className={errors.habeasData ? "form-check-input me-2 Invali" : "form-check-input me-2"} 
                type="checkbox" 
                {...register('habeasData', { required: true })} 
              />
              Autorizo el tratamiento de mis datos.
            </label>
            {errors.habeasData && <p className='text-danger'>Debe aceptar la política de tratamiento de datos.</p>}
          </div>
          <div className="col-1">
            <button type="submit" className='btn btn-primary'>Registrar</button>
          </div>
        </form>

        {code && <p>¡Registro completado! Tu código de sorteo es: {code}</p>}
      </div>
      <div className={code!=''?"col-6 infoUser derecha":'disable'}>
        <table className='col-12'>
          <tbody>
            <tr>
              <th>Nombre</th>
              <td>{data?.nombre}</td>
            </tr>
            <tr>
              <th>Apellido</th>
              <td>{data?.apellido}</td>
            </tr>
            <tr>
              <th>Cedula</th>
              <td>{data?.cedula}</td>
            </tr>
            <tr>
              <th>Departamento</th>
              <td>{data?.departamento}</td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>{data?.ciudad}</td>
            </tr>
            <tr>
              <th>Celular</th>
              <td>{data?.celular}</td>
            </tr>
            <tr>
              <th>Correo</th>
              <td>{data?.correo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-6 pe-0 position-relative">
        <img src="
https://th.bing.com/th/id/OIG3.XWonOo6BoUQmo5Z0HuGz?pid=ImgGn
" alt="Automovil" />
        <div className={code&&"codigoUser izquierda"}>
          <span className="code">{code}</span>
          <span className="succes"><svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
</svg> ¡Buena suerte!</span>
        </div>
      </div>
    </div>
  );
}