import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../pages/Search';
import RenderMatchesComponent from "../components/RenderMatchesComponent";
import { ComponentToRenderWhenReturn } from '../pages/Search'

describe('Buscador', () => {

    test('Al ingresar al buscador se muestra un titulo "busque partidos de un equipo"', () => {
      render(<Search />);
      expect(screen.getByText(/busque partidos de un equipo/i)).toBeInTheDocument();
    });

    test('Cuando la busqueda no encuentra resultados, se muesta un titulo indicandolo', () => {
      render(<RenderMatchesComponent matches={[]} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} />)
      expect(screen.getByText(/no se han encontrado partidos/i)).toBeInTheDocument();
    });

    test('Cuando la busqueda tiene resultados, se muestra un titulo indicandolo', () => {
      render(<RenderMatchesComponent matches={[
        {id: 1, home: 'a', away: 'b', matchStartTime: "2021-10-26T10:32:47.013646"},
        {id: 2, home: 'd', away: 'e', matchStartTime: "2021-10-26T10:32:47.013646"},
      ]} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} />)

      expect(screen.getByText(/resultados:/i)).toBeInTheDocument();
    });

    test('Cuando la busqueda tiene resultados, cada elemento del mismo esta representado', () => {
      const { getAllByTestId } = render(<RenderMatchesComponent matches={[
                                  {id: 1, home: 'a', away: 'b', matchStartTime: "2021-10-26T10:32:47.013646"},
                                  {id: 2, home: 'd', away: 'e', matchStartTime: "2021-10-26T10:32:47.013646"},
                                ]} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} />)

      expect(getAllByTestId('search-item').length).toEqual(2);
    });
  });