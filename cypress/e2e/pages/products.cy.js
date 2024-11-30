describe('Products Page', () => {
beforeEach(() => {
    cy.login('Aldo', '123'); // Login per autenticarsi prima del test
});

it('should display the product cards correctly in grid view', () => {
    cy.visit('/products'); // Visita la pagina dei prodotti

    // Verifica che la visualizzazione griglia funzioni
    cy.get('[id="switch-layout"]').click(); // Assicurati che il pulsante per cambiare layout venga cliccato
    cy.get('.row').should('have.class', 'g-4'); // Controlla che le card siano disposte in griglia
});

it('should display the product cards correctly in list view', () => {
    cy.visit('/products'); // Visita la pagina dei prodotti

    // Verifica che la visualizzazione lista funzioni
    cy.get('.row').should('not.have.class', 'g-4'); // Verifica che la griglia sia convertita in lista
    cy.get('.col-12').should('have.length.greaterThan', 0); // Assicurati che ci siano elementi
});

});

describe('Pagination Tests', () => {
    beforeEach(() => {
    cy.login('Aldo', '123'); // Login per autenticarsi prima del test
    });

    it('should paginate the products correctly', () => {
        cy.visit('/products'); // Visita la pagina dei prodotti

    // Verifica che ci siano più di una pagina
        cy.get('.pagination').should('exist'); // Verifica che la paginazione esista
        cy.get('.pagination .page-item').should('have.length.greaterThan', 1); // Assicurati che ci siano più di una pagina

        // Verifica che la pagina successiva venga caricata
        cy.get('.pagination .page-item').last().click(); // Clicca sulla pagina successiva
        cy.get('[class="page-item active"]').get('[class="page-link"]').contains("2") ; // Verifica che l'URL contenga la pagina successiva
    });
});

describe('Product Interaction Tests', () => {
    beforeEach(() => {
        cy.login('Aldo', '123'); // Login per autenticarsi prima del test
    });


    it('should trigger delete product action', () => {
      cy.visit('/products');
     // Clicca sul pulsante per eliminare un prodotto
     cy.get('[data-testid="delete-button"]').first().should('be.visible').click();
     cy.get('[data-testid="btn-modal-elimina"').first().should('be.visible').click();
    });
});
