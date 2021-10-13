import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../pages/Search';
import SearchResults from '../components/search/SearchResults';

describe('Buscador', () => {

    test('al ingresar al buscador se muestra un titulo "busque partidos de un equipo"', () => {
      render(<Search />);
      expect(screen.getByText(/busque partidos de un equipo/i)).toBeInTheDocument();
    });

    test('cuando la busqueda no encuentra resultados, se muesta un titulo indicandolo', () => {
      render(<SearchResults results={[]}/>)
      expect(screen.getByText(/no se han encontrado partidos/i)).toBeInTheDocument();
    });

    test('cuando la busqueda tiene resultados, se muestra un titulo indicandolo', () => {
      render(<SearchResults results={[
        {id: 1, home: 'a', away: 'b'},
        {id: 2, home: 'd', away: 'e'},
      ]}/>)

      expect(screen.getByText(/resultados:/i)).toBeInTheDocument();
    });

    test('cuando la busqueda tiene resultados, cada elemento del mismo esta representado', () => {
      const { getAllByTestId } = render(<SearchResults results={[
                                  {id: 1, home: 'a', away: 'b'},
                                  {id: 2, home: 'd', away: 'e'},
                                ]}/>)

      expect(getAllByTestId('search-item').length).toEqual(2);
    });
  });