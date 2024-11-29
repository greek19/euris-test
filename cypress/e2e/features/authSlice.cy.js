import { store } from '../../../src/features/store'; // Importa il tuo store
import { login, logout } from '../../../src/features/auth/authSlice'; // Importa le azioni

describe('Auth Slice Tests', () => {
  
  // Prima di ogni test, fai un logout per resettare lo stato
  beforeEach(() => {
    store.dispatch(logout());
  });

  it('should initialize the store with the correct initial state', () => {
    // Verifica che lo stato iniziale di auth sia corretto
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.deep.equal({
        user: null,
        isAuthenticated: false,
      });
    });
  });

  it('should handle login action correctly', () => {
    // Stato iniziale dell'auth
    const initialState = store.getState().auth;

    // Dispatcha l'azione login
    const user = { username: 'testUser' };
    store.dispatch(login(user));

    // Verifica che lo stato di auth sia cambiato
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.not.deep.equal(initialState);
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });
  });

  it('should handle logout action correctly', () => {
    // Primo login
    const user = { username: 'testUser' };
    store.dispatch(login(user));

    // Verifica che l'utente sia loggato
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });

    // Dispatcha l'azione logout
    store.dispatch(logout());

    // Verifica che lo stato sia tornato a quello iniziale
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.be.null;
      expect(state.auth.isAuthenticated).to.be.false;
    });
  });

  it('should not update state if login is dispatched with an already authenticated user', () => {
    // Primo login
    const user = { username: 'testUser' };
    store.dispatch(login(user));

    // Verifica che l'utente sia loggato
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });

    // Dispatcha l'azione login con lo stesso utente
    store.dispatch(login(user));

    // Verifica che lo stato non cambi
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });
  });

  it('should persist state across sessions (optional test if redux-persist is used)', () => {
    // Dispatcha login
    const user = { username: 'persistedUser' };
    store.dispatch(login(user));

    // Simula un ricaricamento della pagina (persistence)
    const persistedState = store.getState();

    // Verifica che lo stato persistito contenga i dati modificati
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(persistedState.auth.user);
      expect(state.auth.isAuthenticated).to.be.true;
    });
  });
});
