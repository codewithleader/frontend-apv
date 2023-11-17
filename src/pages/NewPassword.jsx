import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clientAxios from '../config/axios';
import Alert from '../components/Alert';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alert, setAlert] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isPasswordModified, setIsPasswordModified] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios(
          `/veterinarios/new-password/${token}`
        );

        setAlert({ message: data.msg, error: false });
        setIsTokenValid(true);
      } catch (error) {
        setAlert({ message: 'Hubo un error con el link', error: true });
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    if (password.trim() === '' || password2.trim() === '') {
      setAlert({ message: 'Ambas contraseñas son requeridas', error: true });
      setIsDisabled(false);
      return;
    }

    if (password !== password2) {
      setAlert({ message: 'Contraseñas no coinciden', error: true });
      setIsDisabled(false);
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: 'Contraseña debe tener por lo menos 6 caracteres',
        error: true,
      });
      setIsDisabled(false);
      return;
    }

    try {
      const url = `/veterinarios/new-password/${token}`;
      const { data } = await clientAxios.post(url, { password });

      setAlert({ message: data.msg, error: false });

      setIsPasswordModified(true);

      // Limpiar campos
      setPassword('');
      setPassword2('');
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
        <h1 className='text-emerald-600 font-black text-6xl'>
          Reestablece tu contraseña y No Pierdas Acceso a tus{' '}
          <span className='text-black'>Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-0 shadow-lg px-7 py-10 rounded-xl bg-white'>
        {message ? <Alert alert={alert} /> : null}
        {isTokenValid ? (
          <form onSubmit={handleSubmit}>
            <div className='my-5'>
              <label className='uppercase text-gray-600 block text-xl font-bold'>
                Nueva Contraseña
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
                Confirmar La Nueva Contraseña
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
              value='Guardar Nueva Contraseña'
              className='bg-emerald-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-emerald-800 md:w-auto disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
            />
          </form>
        ) : null}

        {isPasswordModified ? (
          <Link className='block text-center my-5 text-gray-500' to='/'>
            Inicia Sesión
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default NewPassword;
