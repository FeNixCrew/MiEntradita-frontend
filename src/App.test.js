import { render, screen } from '@testing-library/react';
import App from './App';
import LogIn from './pages/LogIn';

describe('<App/>', () => {

  test('Al entrar en la aplicacion te dirige al /login', () => {
    render(<App />);
    expect(window.location.pathname).toEqual('/login');
  });
});

describe('<LogIn/>', () => {
  test('La pagina de login posee una bienvenida', () => {
    render(<LogIn />);
    expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();
  });
});
