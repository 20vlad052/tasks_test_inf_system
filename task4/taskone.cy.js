/// <reference types="cypress" />

context('вход', () => {
    beforeEach(() => {
      cy.visit('https://mspaint.humanhead.com/')
    })
    it('Клик На ведро', () => {
      cy.get('div[title="Fill With Color"]').click();
      })
    it('ПокраскаФона',()=>{
    cy.get('div[title="Fill With Color"]').should('be.visible').click();
    cy.get('div.canvas-area').should('be.visible').click();
    })
    it('ВернутьБелыйцвет',()=>{
    cy.get('div[title="Fill With Color"]').should('be.visible').click();
    cy.get('div.canvas-area').should('be.visible').click();
    cy.get('.swatch.color-button').eq(14).click();
    cy.get('div.canvas-area').should('be.visible').click();
    })
    it( 'Нарисовать', ()=>{
      cy.get('div[title="Polygon"]').click();


const handleSelector = 'div.canvas-area';

// Проверяем, что элемент видим
cy.get(handleSelector).should('be.visible');


const clickCoordinates = [
    { x: 80, y: 75 },
    { x: 170, y: 75 },
    { x: 80, y: 165 },
    { x: 100, y: 185 },
    { x: 125, y: 190 },
    { x: 150, y: 185 },
    { x: 170, y: 165 }
];


clickCoordinates.forEach((coord) => {
    cy.get(handleSelector)
      .click(coord.x, coord.y);
    cy.wait(500);
    })})})