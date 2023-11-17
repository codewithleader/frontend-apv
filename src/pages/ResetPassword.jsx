import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/axios';
import Alert from '../components/Alert';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (email.trim() === '') {
      setAlert({ message: 'Email es requerido', error: true });
      setIsDisabled(false);
      return;
    }

    try {
      const { data } = await clientAxios.post('/veterinarios/reset-password', {
        email,
      });

      setAlert({ message: data.msg, error: false });
      setEmail('');
    } catch (error) {
      setAlert({ message: error.response.data.msg, error: true });
      setIsDisabled(false);
    }
  };

  // Si 'message' no tiene nada no mostramos la alerta
  const { message } = alert;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Recupera tu acceso y no Pierdas{' '}
          <span className='text-black'>tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-0 shadow-lg px-7 py-10 rounded-xl bg-white'>
        {message ? <Alert alert={alert} /> : null}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email Registrado'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            disabled={isDisabled}
            type='submit'
            value='Enviar Instrucciones'
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/'>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className='block text-center my-5 text-gray-500'
            to='/registrar'
          >
            ¿No tienes una Cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ResetPassword;
