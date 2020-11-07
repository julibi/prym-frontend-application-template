import { initialState } from '../reducer/signUp.reducer';
import { SIGNUP } from './signUp.actions';

describe('signUp action creator', () => {
  it('should create correct action', () => {
    expect(SIGNUP({ foo: 'bar' })).toEqual({ type: 'SIGNUP', payload: { foo: 'bar' } });
  });
});