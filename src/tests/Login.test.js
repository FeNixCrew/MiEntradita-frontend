import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/forms/login/LoginForm';
import LogIn from '../pages/LogIn';

describe('Inicio de la aplicacion', () => {
  test('La pagina de login posee una bienvenida', () => {
    render(<LogIn />);
    expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();
  });

  test('Si se recibe un error, este es mostrado', () => {
    const { getByTestId } = render(<LoginForm onSubmit={jest.fn()} error='un error' resetError={jest.fn()} />);
    
    expect(getByTestId('error')).toBeInTheDocument();
  });
});

