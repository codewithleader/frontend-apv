import { useContext } from 'react';
import PatientsContext from '../context/PatientsProvider';

// Esto devuelve la propiedad 'savePatient' y 'patients'
const usePatients = () => {
  return useContext(PatientsContext);
};

export default usePatients;
