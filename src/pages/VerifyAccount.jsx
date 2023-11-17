import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clientAxios from '../config/axios';
// Components
import Alert from '../components/Alert';

const VerifyAccount = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const { token } = useParams();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        const { data } = await clientAxios(url);

        setIsVerified(true);

        setAlert({ message: data.msg, error: false });
      } catch (error) {
        setAlert({ message: error.response.data.msg, error: true });
      }
      setIsLoading(false);
    };

    verifyAccount();
  }, [token]);

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma tu Cuenta y comienza a Administrar tus{' '}
          <span className='text-black'>Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-0 shadow-lg px-7 py-10 rounded-xl bg-white'>
        {!isLoading ? <Alert alert={alert} /> : null}

        {isVerified ? (
          <Link className='block text-center my-5 text-gray-500' to='/'>
            Inicia Sesión
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default VerifyAccount;
