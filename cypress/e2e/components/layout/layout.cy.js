describe('Test Layout.jsx ', () => {
  beforeEach(() => {
    cy.login('Aldo', '123');
  });
  
  it('Test visualizzazione header non autenticato', () => {
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'auth/logout',  
      });
    });

    cy.visit('/'); 
    cy.get('nav').should('exist'); 
    cy.get('a[href="/login"]').should('exist');
  });

  it('Test visualizzazione header autenticato', () => {
    cy.window().then((win) => {
      win.store.dispatch({
        type: 'auth/login', 
        payload: { username: 'Aldo', password: '123' },
      });
    });

    cy.visit('/'); 
    cy.get('span').should('contain.text', 'Aldo'); 
    cy.get('button').should('contain.text', 'Logout');
  });
});

