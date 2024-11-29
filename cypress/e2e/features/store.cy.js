import { store } from '../../../src/features/store';
import { productsApi } from '../../../src/features/products/productsApi';

describe('Redux Store Tests', () => {
  it('should initialize the store with the correct reducers', () => {
    cy.wrap(store.getState()).then((state) => {
      // Verifica che lo stato iniziale contenga auth
      expect(state.auth).to.exist;

      // Verifica che lo stato iniziale contenga productsApi
      expect(state[productsApi.reducerPath]).to.exist;
    });
  });

  it('should handle dispatching actions to the auth reducer', () => {
    const initialAuthState = store.getState().auth;

    store.dispatch({ type: 'auth/login', payload: { username: 'testUser' } });

    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.not.deep.equal(initialAuthState);
      expect(state.auth.user).to.deep.equal({ username: 'testUser' });
    });
  });

  it('should persist the state using redux-persist', () => {
    store.dispatch({ type: 'auth/login', payload: { username: 'persistedUser' } });

    const persistedState = store.getState();

    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(persistedState.auth.user);
    });
  });

 
});
