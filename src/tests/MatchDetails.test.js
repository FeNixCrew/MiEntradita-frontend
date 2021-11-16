import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import matchService from '../services/MatchService';
import MatchDetails from '../components/details/MatchDetails.jsx';

describe('Detalles de partido', () => {

    test('Al ver los detalles de un encuentro, se buscan los datos del mismo', () => {
        const getMatchDetailsCall = jest.spyOn(matchService, 'getMatchDetails');
        const result = {
                status: 200,
                data: {
                    matchStartTime: '2020-10-12T18:30',
                    stadium: 'Alberto Lopez',
                    ticketPrice: 500, 
                }
        };
        getMatchDetailsCall.mockImplementation(() => Promise.resolve(result));

        act(() => {
            render(<MatchDetails open={true} handleClose={jest.fn()} matchId={1} title={'un titulo'} styleClasses={{mainContainer: ''}} underTesting={true}/>);
        });

        expect(getMatchDetailsCall).toHaveBeenCalledTimes(1);
    });
});
