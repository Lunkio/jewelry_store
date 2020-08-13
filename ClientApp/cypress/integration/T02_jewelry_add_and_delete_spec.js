/* eslint-disable no-undef */
describe('when logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/testing/reset')
        cy.visit('http://localhost:3000/admin/login')
        cy.get('#un').type('jewelryAdmin')
        cy.get('#pw').type('secret')
        cy.contains('Login').click()
        cy.contains('Add Jewelry')
    })

    it('a new jewelry can be added and deleted', function() {
        const fileName = 'ear1.jpg'
        cy.get('#ear').click()
        cy.fixture(fileName).then(fileContent => {
            cy.get('[type="file"]').upload({ fileContent, fileName, mimeType: 'image/jpeg' })
        })
        cy.get('#price').type(0)
        cy.get('#story').type('cypress-eiole')
        cy.contains('Upload').click()
        cy.wait(5000)
        cy.contains('Jewelry On Sale').click()
        cy.contains('Price')
        cy.contains('Delete').click()
        cy.contains('No jewelries on sale')
    })
})