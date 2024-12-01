// Effettua il login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login'); 

  cy.get('[id="username"]').type(username);
  cy.get('[id="password"]').type(password);
  cy.get('[id="button-login"]').click();

  cy.url().should('not.include', '/login'); 
});