/* eslint-disable no-undef */
describe('Admin login', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/admin/login')
    })

    it('admin login-page can be opened', function() {
        cy.contains('Username')
    })

    it('login is possible', function() {
        cy.get('#un').type('jewelryAdmin')
        cy.get('#pw').type('secret')
        cy.contains('Login').click()
        cy.contains('Add Jewelry')
    })
})