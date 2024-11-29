describe('Layout Tests', () => {
  beforeEach(() => {
    cy.login('Aldo', '123');
  });
  
  it('should display the HeaderNonAuth when not authenticated', () => {
    // Simula che l'utente non è autenticato
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'auth/logout',  // Simula il logout (stato non autenticato)
      });
    });

    cy.visit('/'); // Visita la home
    cy.get('nav').should('exist'); // Dovrebbe esserci il menu di login
    cy.get('a[href="/login"]').should('exist'); // Il link di login dovrebbe esserci
  });

  it('should display the Header when authenticated', () => {
    // Simula che l'utente è autenticato
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'auth/login',  // Simula il login
        payload: { username: 'Aldo', password: '123' },
      });
    });

    cy.visit('/'); // Visita la home
    cy.get('span').should('contain.text', 'Aldo'); // Il nome utente deve essere visibile
    cy.get('button').should('contain.text', 'Logout'); // Il pulsante di logout deve essere presente
  });
});

