import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tickets from '../components/ticket/TicketsCarousel';

describe('Home de espectador', () => {

    test('Si no hay entradas, se muestra un titulo de que no hay entradas reservadas disponibles', () => {
      render(<Tickets tickets={[]}/>);
      
      expect(screen.getByText(/no tienes entradas reservadas disponibles/i)).toBeInTheDocument();
    });

    test('Si hay entradas, se muestran las mismas en un carrusel y un titulo de "tus entradas"', () => {
      const entradas = [
        {
          userId: 1,
          matchId: 1,
          matchStartTime: '2020-10-10T18:30',
          home: 'equipo1',
          away: 'equipo2',
        }
      ];
      const { getByTestId } = render(<Tickets tickets={entradas}/>);
      
      expect(getByTestId('carousel-div')).toBeInTheDocument();
      expect(screen.getByText(/tus entradas/i)).toBeInTheDocument();
    });
});