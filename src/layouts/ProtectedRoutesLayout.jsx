import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoutesLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    );
  }

  return (
    <>
      {auth?.id ? (
        <>
          <Header />
          <main className='container mx-auto mt-10'>
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default ProtectedRoutesLayout;
