import { useState } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../config/axios';
// Components
import Alert from '../components/Alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDisabled(true);

    if (
      [name.trim(), email.trim(), password.trim(), password2.trim()].includes(
        ''
      )
    ) {
      setAlert({ message: 'Hay campos vacíos', error: true });
      setIsDisabled(false);
      return;
    }

    if (password !== password2) {
      setAlert({ message: 'Las contraseñas no son iguales', error: true });
      setIsDisabled(false);
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: 'La contraseña debe ser al menos de 6 caracteres',
        error: true,
      });
      setIsDisabled(false);
      return;
    }

    // Limpiar alertas
    setAlert({});

    // Crear usuario con la API
    try {
      const url = '/veterinarios';
      await clientAxios.post(url, { name, email, password });

      setAlert({
        message: 'Creado correctamente, revisa tu email',
        error: false,
      });

      // Limpiar campos
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (error) {
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
      setIsDisabled(false);
    }
  };

  // Si 'message' no tiene nada no mostramos la alerta
  const { message } = alert;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Crea tu Cuenta y Administra tus{' '}
          <span className='text-black'>Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-0 shadow-lg px-7 py-10 rounded-xl bg-white'>
        {message ? <Alert alert={alert} /> : null}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Contraseña
            </label>
            <input
              type='password'
              placeholder='Tu contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Confirmar Contraseña
            </label>
            <input
              type='password'
              placeholder='Confirma tu contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <input
            disabled={isDisabled}
            type='submit'
            value='Crear Cuenta'
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/'>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className='block text-center my-5 text-gray-500'
            to='/reset-password'
          >
            Recuperar contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
