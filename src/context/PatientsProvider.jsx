import { createContext, useState, useEffect } from 'react';
import clientAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PatientsContext = createContext();

// eslint-disable-next-line react/prop-types
export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios('/pacientes', config);

        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getPatients();
  }, [auth]);

  const savePatient = async (patient) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (patient.id) {
      try {
        const {
          data: { patientUpdated },
        } = await clientAxios.put(`/pacientes/${patient.id}`, patient, config);

        const patientsArrayUpdated = patients.map((patientState) =>
          patientState.id === patientUpdated.id ? patientUpdated : patientState
        );

        setPatients(patientsArrayUpdated);
      } catch (error) {
        console.error(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clientAxios.post('/pacientes', patient, config);

        // eslint-disable-next-line no-unused-vars
        const { createdAt, updatedAt, ...newPacient } = data;

        setPatients([newPacient, ...patients]);
      } catch (error) {
        console.error(error.response.data.msg);
      }
    }
  };

  const setEdit = (patient) => {
    setPatient(patient);
  };

  const deletePatient = async (id) => {
    const hasConfirmed = confirm('¿Confirmas que deseas eliminar?');

    if (!hasConfirmed) return;

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await clientAxios.delete(`/pacientes/${id}`, config);

      const patiendsArrayBeforeDelete = patients.filter((p) => p.id !== id);

      setPatients(patiendsArrayBeforeDelete);
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        //
        loading,
        patient,
        patients,
        setPatients,
        savePatient,
        setEdit,
        deletePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;
