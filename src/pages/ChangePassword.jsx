import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

// Estado inicial de password_old y password_new
const initialState = {
  p_old: '',
  p_new: '',
};

const ChangePassword = () => {
  const [alert, setAlert] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const [password, setPassword] = useState(initialState);

  const { changePassword } = useAuth();

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setAlert({});

    const isSomeFieldEmpty = Object.values(password).some(
      (field) => field === ''
    );

    if (isSomeFieldEmpty) {
      setAlert({ message: 'Todos los campos son obligatorios', error: true });
      setIsDisabled(false);
      return;
    }

    if (password.p_new.length < 6) {
      setAlert({
        message: 'La nueva contraseña debe tener al menos 6 caracteres',
        error: true,
      });
      setIsDisabled(false);
      return;
    }

    if (password.p_old === password.p_new) {
      setAlert({
        message: 'La nueva contraseña debe ser diferente a la actual',
        error: true,
      });
      setIsDisabled(false);
      return;
    }

    const result = await changePassword(password);

    if (result.error) {
      setAlert(result);
      setIsDisabled(false);
      return;
    }

    setAlert(result);

    setPassword(initialState);

    setTimeout(() => {
      setAlert({});
      setIsDisabled(false);
    }, 5000);
  };

  const { message } = alert;
  return (
    <>
      <AdminNav />

      <h2 className='font-black text-3xl text-center mt-10'>
        Cambiar Contraseña
      </h2>
      <p className='text-xl mt-5 mb-10 text-center'>
        Modifica tu{' '}
        <span className='text-emerald-600 font-bold'>Contraseña aquí</span>
      </p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {message ? <Alert alert={alert} /> : null}
          <form onSubmit={handleSubmit}>
            {/* Contraseña Actual */}
            <div className='my-3'>
              <label
                htmlFor='p_old'
                className='uppercase font-bold text-gray-600'
              >
                Contraseña actual
              </label>
              <input
                type='password'
                id='p_old'
                name='p_old'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                placeholder='Escribe tu contraseña actual'
                value={password.p_old}
                onChange={handleChange}
              />
            </div>

            {/* Nueva Contraseña */}
            <div className='my-3'>
              <label
                htmlFor='p_new'
                className='uppercase font-bold text-gray-600'
              >
                Nueva Contraseña
              </label>
              <input
                type='password'
                id='p_new'
                name='p_new'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                placeholder='Nueva contraseña'
                value={password.p_new}
                onChange={handleChange}
              />
            </div>

            {/* Input:Submit */}
            <input
              disabled={isDisabled}
              type='submit'
              value='Cambiar Contraseña'
              className='bg-emerald-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer
              disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
