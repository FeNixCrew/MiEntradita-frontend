import { render, screen } from '@testing-library/react';
import LoginForm from '../components/forms/LoginForm';
import LogIn from '../pages/LogIn';

describe('Inicio de la aplicacion', () => {
  test('La pagina de login posee una bienvenida', () => {
    const { getByTestId } = render(<LogIn />);
    expect(getByTestId('welcome')).toBeInTheDocument();
  });

  test('Si se recibe un error, este es mostrado', () => {
    const { getByTestId } = render(<LoginForm onSubmit={jest.fn()} error='un error' resetError={jest.fn()} />);
    
    expect(getByTestId('error')).toBeInTheDocument();
  });
});

