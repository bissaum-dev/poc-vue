describe('Página de Produtos', () => {
  beforeEach(() => {
    cy.intercept('GET', '/product', { fixture: 'products.json' }).as('getProducts')
    cy.intercept('POST', '/wishlist/*', { statusCode: 200 }).as('addWishlist')
    cy.intercept('DELETE', '/wishlist/*', { statusCode: 200 }).as('removeWishlist')
    cy.visit('/')
  })

  it('Deve exibir o breadcrumb corretamente', () => {
    cy.get('.wrapper ul').within(() => {
      cy.contains('Home').should('exist')
    })
  })

  it('Deve exibir a mensagem "Carregando..." enquanto os produtos estão sendo carregados', () => {
    cy.get('.loading-list').should('exist')
    cy.wait('@getProducts')
    cy.get('.loading-list').should('not.exist')
  })

  it('Deve exibir os produtos corretamente', () => {
    cy.wait('@getProducts')
    cy.get('.product-list').within(() => {
      cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0)
    })
  })

  it('Deve adicionar um produto à lista de desejos', () => {
    cy.wait('@getProducts')
    cy.get('[data-cy="product-card"]')
      .first()
      .within(() => {
        cy.get('[data-cy="favorite-button"]').click()
      })
    cy.wait('@addWishlist').its('response.statusCode').should('eq', 200)
  })

  it('Deve remover um produto da lista de desejos', () => {
    cy.wait('@getProducts')
    cy.get('[data-cy="product-card"]')
      .first()
      .within(() => {
        cy.get('[data-cy="favorite-button"]').click()
        cy.get('[data-cy="favorite-button"]').click()
      })
    cy.wait('@removeWishlist').its('response.statusCode').should('eq', 200)
  })
})
