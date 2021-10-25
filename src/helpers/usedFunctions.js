export const exit = (history) => {
  localStorage.clear();
  history.push('/');
}

export const isScanner = () => {
  return localStorage.getItem('role') === 'ROLE_SCANNER'
}

export const isAdmin = () => {
  return localStorage.getItem('role') === 'ROLE_ADMIN'
}

export const isUser = () => {
  return localStorage.getItem('role') === 'ROLE_USER'
}

export const isLogin = () => {
  return localStorage.getItem('username') !== null
}

const LOCAL = 'es-AR';

const TIME_CONFIG = {
  hour: '2-digit',
  minute: '2-digit'
};

const DATE_CONFIG = {
  month: 'numeric',
  day: '2-digit',
  year: 'numeric'
};

const customFormatter = (date, config) => {
  const dateParsed = new Date(date);
  const formatter = new Intl.DateTimeFormat(LOCAL, config);
  return formatter.format(dateParsed);
};

export const formatDateAndTime = date =>
  `${customFormatter(date, DATE_CONFIG)} ${customFormatter(date, TIME_CONFIG)}hs`;

export const saveData = response => {
  localStorage.setItem('spectatorId', response.data.id);
  localStorage.setItem('username', response.data.username);
  localStorage.setItem('role', response.data.role);
  localStorage.setItem('auth', response.headers.authorization);
}

export const NotFoundMessage = "Recurso no encontrado"
export const ServerErrorMessage = "Error de servidor"

export const label = (text) => {
  return <span style={{fontFamily: 'Quicksand'}}>{text}</span>
}