describe('Wishlist Page', () => {
  beforeEach(() => {
    cy.visit('/wishlist')
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('GET', '/wishlist', { fixture: 'wishlist.json' }).as('getWishlist')
    cy.intercept('DELETE', '/wishlist/*', { status: 200 }).as('removeFromWishlist')
  })

  it('should display the breadcrumb with correct links', () => {
    cy.get('.wrapper ul').within(() => {
      cy.contains('Home').should('have.attr', 'href', '/')
      cy.contains('Wishlist').should('exist')
    })
  })

  it('should remove a product from the wishlist', () => {
    cy.wait('@getWishlist')
    cy.get('[data-cy="remove-button"]').first().should('be.visible')
    cy.get('[data-cy="remove-button"]').first().click()
    cy.wait('@removeFromWishlist')
  })

  it('should display a message when there are no items in the wishlist', () => {
    cy.get('.empty-list').should('be.visible')
    cy.contains('Nenhum produto foi adicionado na lista de desejos').should('be.visible')
    cy.get('a').contains('Ver produtos').should('be.visible')
  })
})
