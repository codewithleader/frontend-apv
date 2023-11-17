/* eslint-disable react/prop-types */

import usePatients from '../hooks/usePatients';
import { formatDateIntl } from '../utils/formatDate';

// eslint-disable-next-line react/prop-types
const Patient = ({ patient }) => {
  const { setEdit, deletePatient } = usePatients();
  const { id, name, owner, email, discharge_date, symptoms, veterinarian } =
    patient;
  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Nombre:{' '}
        <span className='font-normal normal-case text-black'>{name}</span>
      </p>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Propietario:{' '}
        <span className='font-normal normal-case text-black'>{owner}</span>
      </p>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Email Contacto:{' '}
        <span className='font-normal normal-case text-black'>{email}</span>
      </p>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Fecha Alta:{' '}
        <span className='font-normal normal-case text-black'>
          {formatDateIntl(discharge_date)}
        </span>
      </p>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Síntomas:{' '}
        <span className='font-normal normal-case text-black'>{symptoms}</span>
      </p>
      <p className='font-bold uppercase text-indigo-700 my-2'>
        Veterinario:{' '}
        <span className='font-normal normal-case text-black'>
          {veterinarian}
        </span>
      </p>

      <div className='flex justify-between my-5'>
        <button
          type='button'
          className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg'
          onClick={() => setEdit(patient)}
        >
          Editar
        </button>

        <button
          type='button'
          className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'
          onClick={() => deletePatient(id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Patient;
