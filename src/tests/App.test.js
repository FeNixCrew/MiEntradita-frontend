import { render } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import App from '../App';
import { act } from 'react-dom/test-utils';
import authService from '../services/AuthService';
import userEvent from '@testing-library/user-event';

describe('<App/> renderizando <LogIn/>', () => {
  test('Al iniciar la aplicacion te dirige al /login', () => {
    render(<App />);
    expect(window.location.pathname).toEqual('/login');
  });

  test('No se envia el formulario de login si no se llenan todos los campos', () => {
    const loginCall = jest.fn();
    const { getByTestId } = render(<App />);
    const usernameInput = getByTestId('username');

    act(() => {
      userEvent.type(usernameInput, 'usuario');
      fireEvent.click(getByTestId('login-button'));
    });

    expect(usernameInput.value).toEqual('usuario');
    expect(loginCall).toHaveBeenCalledTimes(0);
  });

  test('Se puede enviar el formulario llenando los campos', () => {
    const loginCall = jest.spyOn(authService, 'login');
    const error = {
      response: {
        status: 400,
        data: {
          message: 'ocurrio algo malo',
        }
      }
    };
    loginCall.mockImplementation(() => Promise.reject(error));
    const { getByTestId } = render(<App />);
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');

    act(() => {
      userEvent.type(usernameInput, 'usuario');
      userEvent.type(passwordInput, '123456');
      fireEvent.click(getByTestId('login-button'));
    });

    expect(usernameInput.value).toEqual('usuario');
    expect(passwordInput.value).toEqual('123456');
    expect(loginCall).toHaveBeenCalledTimes(1);
  });


  test('Se renderiza un error cuando sale algo mal al validar el usuario', () => {
    const loginCall = jest.spyOn(authService, 'login');
    const error = {
      response: {
        status: 400,
        data: {
          message: 'ocurrio algo malo',
        }
      }
    };
    loginCall.mockImplementation(() => Promise.reject(error));
    const { getByTestId } = render(<App />);
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');

    act(() => {
      userEvent.type(usernameInput, 'usuario');
      userEvent.type(passwordInput, '123456');
      fireEvent.click(getByTestId('login-button'));
    });

    act(async () => {
      await waitFor(() => expect(getByTestId('error')).toBeInTheDocument());
    });

  });

});

