// eslint-disable-next-line react/prop-types
const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        // eslint-disable-next-line react/prop-types
        alert.error
          ? 'from-red-400 to-red-600'
          : 'from-indigo-400 to-indigo-600'
      } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {alert.message}
    </div>
  );
};

export default Alert;
