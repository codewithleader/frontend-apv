import { useEffect, useState } from 'react';
import Alert from './Alert';
import usePatients from '../hooks/usePatients';
import { formatDate } from '../utils/formatDate';

const Form = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [discharge_date, setDischarge_date] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [id, setId] = useState(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const [alert, setAlert] = useState({});

  const { patient, savePatient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDischarge_date(formatDate(patient.discharge_date));
      setSymptoms(patient.symptoms);
      setId(patient.id);
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (
      [
        name.trim(),
        owner.trim(),
        email.trim(),
        discharge_date,
        symptoms.trim(),
      ].includes('')
    ) {
      setAlert({ message: 'Todos los campos son obligatorios', error: true });
      setIsDisabled(false);
      return;
    }

    await savePatient({
      name: name.trim(),
      owner: owner.trim(),
      email: email.trim(),
      discharge_date: discharge_date.trim(),
      symptoms: symptoms.trim(),
      id,
    });

    // Limpiar formulario
    setId(null);
    setName('');
    setOwner('');
    setEmail('');
    setDischarge_date('');
    setSymptoms('');
    setIsDisabled(false);

    setAlert({ message: 'Guardado Exitosamente', error: false });

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  return (
    <>
      <p className='text-xl mt-5 mb-10 text-center'>
        Añade tus pacientes y{' '}
        <span className='text-emerald-600 font-bold'>Administralos</span>
      </p>

      <form
        //
        className='bg-white py-10 px-5 mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit}
      >
        {/* Pet name */}
        <div className='mb-5'>
          <label
            //
            htmlFor='name'
            className='text-gray-700 uppercase font-bold'
          >
            Nombre Mascota
          </label>
          <input
            type='text'
            id='name'
            placeholder='Nombre de la Mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Owner name */}
        <div className='mb-5'>
          <label
            //
            htmlFor='owner'
            className='text-gray-700 uppercase font-bold'
          >
            Nombre Propietario
          </label>
          <input
            type='text'
            id='owner'
            placeholder='Nombre del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        {/* Owner email */}
        <div className='mb-5'>
          <label
            //
            htmlFor='email'
            className='text-gray-700 uppercase font-bold'
          >
            Email Propietario
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email del Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Discharge Date: Fecha de alta */}
        <div className='mb-5'>
          <label
            //
            htmlFor='discharge_date'
            className='text-gray-700 uppercase font-bold'
          >
            Fecha de Alta
          </label>
          <input
            type='date'
            id='discharge_date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={discharge_date}
            onChange={(e) => setDischarge_date(e.target.value)}
          />
        </div>

        {/* Pet Symptoms */}
        <div className='mb-5'>
          <label
            //
            htmlFor='symptoms'
            className='text-gray-700 uppercase font-bold'
          >
            Síntomas
          </label>
          <textarea
            id='symptoms'
            placeholder='Describe los síntomas de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          disabled={isDisabled}
          type='submit'
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
          className='bg-emerald-600 w-full p-3 text-white uppercase font-bold hover:bg-emerald-700 cursor-pointer transition-colors disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
        />
      </form>

      {alert.message ? <Alert alert={alert} /> : null}
    </>
  );
};

export default Form;
