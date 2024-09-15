"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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

// Función para manejar el formulario
const handleFormSubmit = (data: any, setCode: React.Dispatch<React.SetStateAction<string>>) => {
  const newCode = generateCode();
  setCode(newCode);
};

export default function Forms() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedDepartamento, setSelectedDepartamento] = useState<Departamento | ''>('');
  const [code, setCode] = useState('');

  // Función para manejar el cambio de departamento
  const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartamento(e.target.value as Departamento);
  };

  // Función que se pasa a `handleSubmit`
  const onSubmit = (data: any) => {
    handleFormSubmit(data, setCode);
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Registro al Sorteo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre:</label>
          <input {...register('nombre', { required: true, pattern: /^[A-Za-z]+$/i })} />
          {errors.nombre && <p>El nombre es obligatorio y debe contener solo letras.</p>}
        </div>
        
        <div>
          <label>Apellido:</label>
          <input {...register('apellido', { required: true, pattern: /^[A-Za-z]+$/i })} />
          {errors.apellido && <p>El apellido es obligatorio y debe contener solo letras.</p>}
        </div>
        
        <div>
          <label>Cédula:</label>
          <input {...register('cedula', { required: true, pattern: /^[0-9]+$/ })} />
          {errors.cedula && <p>La cédula es obligatoria y debe contener solo números.</p>}
        </div>
        
        <div>
          <label>Departamento:</label>
          <select {...register('departamento', { required: true })} onChange={handleDepartamentoChange}>
            <option value="">Seleccione un departamento</option>
            {departamentos.map(depto => (
              <option key={depto} value={depto}>{depto}</option>
            ))}
          </select>
          {errors.departamento && <p>Seleccione un departamento.</p>}
        </div>
        
        <div>
          <label>Ciudad:</label>
          <select {...register('ciudad', { required: true })}>
            <option value="">Seleccione una ciudad</option>
            {selectedDepartamento && ciudades[selectedDepartamento as Departamento].map(ciudad => (
              <option key={ciudad} value={ciudad}>{ciudad}</option>
            ))}
          </select>
          {errors.ciudad && <p>Seleccione una ciudad.</p>}
        </div>
        
        <div>
          <label>Celular:</label>
          <input {...register('celular', { required: true, pattern: /^[0-9]+$/ })} />
          {errors.celular && <p>El celular es obligatorio y debe contener solo números.</p>}
        </div>
        
        <div>
          <label>Correo Electrónico:</label>
          <input {...register('correo', { required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })} />
          {errors.correo && <p>El correo es obligatorio y debe contener un formato válido.</p>}
        </div>
        
        <div>
          <label>
            <input type="checkbox" {...register('habeasData', { required: true })} />
            Autorizo el tratamiento de mis datos.
          </label>
          {errors.habeasData && <p>Debe aceptar la política de tratamiento de datos.</p>}
        </div>

        <button type="submit">Registrar</button>
      </form>

      {code && <p>¡Registro completado! Tu código de sorteo es: {code}</p>}
    </div>
  );
}
