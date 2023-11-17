// Función para formatear la fecha a "yyyy-MM-dd"
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  // Agrega un cero delante si el mes o el día son menores a 10
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

// Función para formatear la fecha a "25 enero 2023"
export const formatDateIntl = (date) => {
  const newDate = new Date(date);

  return Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
  }).format(newDate);
};

/** "weekday, month day, year" */
export function dateFormat(myDate) {
  const dateObj = new Date(myDate + ' 00:00');
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const dateFormat = dateObj.toLocaleDateString('es-CO', options);
  return dateFormat;
}
