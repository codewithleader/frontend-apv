import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({});
    setIsDisabled(true);

    if ([email.trim(), password.trim()].includes('')) {
      setAlert({ message: 'Email y Contraseña son requeridos', error: true });
      setIsDisabled(false);
      return;
    }

    // Falta verificar expresion regular de EMAIL
    try {
      const {
        data: { user },
      } = await clientAxios.post('/veterinarios/login', {
        email,
        password,
      });

      // Guardar token en localStorage
      localStorage.setItem('token', user.token);

      setAuth(user);

      navigate('/admin');
    } catch (error) {
      setAlert({ message: error.response.data.msg, error: true });
      setIsDisabled(false);
    }
  };

  const { message } = alert;

  return (
    <>
      <div>
        <h1 className='text-emerald-600 font-black text-6xl'>
          Inicia Sesión y Administra tus{' '}
          <span className='text-black'>Pacientes</span>
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

          <input
            disabled={isDisabled}
            type='submit'
            value='Iniciar Sesión'
            className='bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-500'
            to='/registrar'
          >
            ¿No tienes una cuenta? Regístrate
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

export default Login;
