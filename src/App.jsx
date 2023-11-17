import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoutesLayout from './layouts/ProtectedRoutesLayout';
import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';
import Register from './pages/Register';
import VerifyAccount from './pages/VerifyAccount';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Login from './pages/Login';
import AdminPatients from './pages/AdminPatients';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/changePassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              {/* Rutas Públicas */}
              <Route index element={<Login />} />
              {/* Las demas rutas no hay que agregarles el slash '/' ya que se unen al padre. 'registrar' quedaría '/registrar' y asi las demás  */}
              <Route path='registrar' element={<Register />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='new-password/:token' element={<NewPassword />} />
              <Route path='confirmar/:token' element={<VerifyAccount />} />
            </Route>

            {/* Rutas Privadas */}
            <Route path='/admin' element={<ProtectedRoutesLayout />}>
              <Route index element={<AdminPatients />} />
              <Route path='perfil' element={<EditProfile />} />
              <Route path='change-password' element={<ChangePassword />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
