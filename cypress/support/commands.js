Cypress.Commands.add('login', (username, password) => {
  // Interagisci con il form di login o modifica lo stato Redux per autenticarti
  cy.visit('/login'); // Assicurati che la pagina di login sia accessibile

  // Compila il form di login e invia
  cy.get('[id="username"]').type(username);
  cy.get('[id="password"]').type(password);
  cy.get('[id="button-login"]').click();

  // Verifica che il login abbia avuto successo
  cy.url().should('not.include', '/login'); // Controlla che non sei più sulla pagina di login
});