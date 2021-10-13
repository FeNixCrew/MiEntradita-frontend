import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Inicio de la aplicacion', () => {
  test('Al iniciar la aplicacion te dirige al /login', () => {
    render(<App />);
    expect(window.location.pathname).toEqual('/login');
  });
});

