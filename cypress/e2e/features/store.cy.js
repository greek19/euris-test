import { store } from '../../../src/features/store';
import { productsApi } from '../../../src/features/products/productsApi';

describe('Test store.js', () => {
  it('Test inizializzazione store con i corretti reducer', () => {
    cy.wrap(store.getState()).then((state) => {
      // Verifica che lo stato iniziale contenga auth
      expect(state.auth).to.exist;

      // Verifica che lo stato iniziale contenga productsApi
      expect(state[productsApi.reducerPath]).to.exist;
    });
  });

  it('Test dispatch actions', () => {
    const initialAuthState = store.getState().auth;

    store.dispatch({ type: 'auth/login', payload: { username: 'testUser' } });

    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.not.deep.equal(initialAuthState);
      expect(state.auth.user).to.deep.equal({ username: 'testUser' });
    });
  });

  it('Test del persist', () => {
    store.dispatch({ type: 'auth/login', payload: { username: 'persistedUser' } });

    const persistedState = store.getState();

    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(persistedState.auth.user);
    });
  });

 
});
