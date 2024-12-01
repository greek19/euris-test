import { store } from '../../../src/features/store'; // Importa il tuo store
import { login, logout } from '../../../src/features/auth/authSlice'; // Importa le azioni

describe('Test authSlice', () => {
    beforeEach(() => {
    store.dispatch(logout());
  });

  it('Test inizializzazione store', () => {
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.deep.equal({
        user: null,
        isAuthenticated: false,
      });
    });
  });

  it('Test login', () => {
    const initialState = store.getState().auth;

    const user = { username: 'testUser' };
    store.dispatch(login(user));

    cy.wrap(store.getState()).then((state) => {
      expect(state.auth).to.not.deep.equal(initialState);
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });
  });

  it('Test logout', () => {
    const user = { username: 'testUser' };
    store.dispatch(login(user));

    // Verifica che l'utente sia loggato
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });

    store.dispatch(logout());

    // Verifica che lo stato sia tornato a quello iniziale
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.be.null;
      expect(state.auth.isAuthenticated).to.be.false;
    });
  });

  it('Test stato se si prova a rifare un login con un utente già autenticato', () => {
    const user = { username: 'testUser' };
    store.dispatch(login(user));

    // Verifica che l'utente sia loggato
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });

    store.dispatch(login(user));

    // Verifica che lo stato non cambi
    cy.wrap(store.getState()).then((state) => {
      expect(state.auth.user).to.deep.equal(user);
      expect(state.auth.isAuthenticated).to.be.true;
    });
  });

  it('Test persist', () => {
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
