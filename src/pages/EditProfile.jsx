import { useEffect, useState } from 'react';
import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const EditProfile = () => {
  const { auth, updateProfile } = useAuth();

  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData(auth);
  }, [auth]);

  async function handleSubmit(e) {
    e.preventDefault();
    setAlert({});
    setIsDisabled(true);
    const { name, email } = formData;

    if ([name.trim(), email.trim()].includes('')) {
      setAlert({
        message: 'Email y Nombre son obligatorios',
        error: true,
      });
      setIsDisabled(false);
      return;
    }

    const result = await updateProfile(formData); // 'result' es un objeto tipo alerta {message:string, error: boolean}

    setAlert(result);

    setIsDisabled(false);
  }

  const { message } = alert;

  return (
    <>
      <AdminNav />

      <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
        Modifica tu{' '}
        <span className='text-indigo-600 font-bold'>Información aquí</span>
      </p>

      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {message ? <Alert alert={alert} /> : null}
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className='my-3'>
              <label
                htmlFor='name'
                className='uppercase font-bold text-gray-600'
              >
                Nombre
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Sitio Web */}
            <div className='my-3'>
              <label
                htmlFor='web'
                className='uppercase font-bold text-gray-600'
              >
                Sitio Web
              </label>
              <input
                type='text'
                id='web'
                name='web'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                value={formData.web || ''}
                onChange={handleChange}
              />
            </div>

            {/* Telefono */}
            <div className='my-3'>
              <label
                htmlFor='phone'
                className='uppercase font-bold text-gray-600'
              >
                Teléfono
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                value={formData.phone || ''}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className='my-3'>
              <label
                htmlFor='email'
                className='uppercase font-bold text-gray-600'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>

            <input
              disabled={isDisabled}
              type='submit'
              value='Guardar Cambios'
              className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5
              disabled:bg-gray-400 disabled:hover:cursor-not-allowed'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
