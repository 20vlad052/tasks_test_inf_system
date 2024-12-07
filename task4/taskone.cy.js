/// <reference types="cypress" />

context('вход', () => {
  beforeEach(() => {
    cy.visit('https://mspaint.humanhead.com/')
  })
  it('Клик На ведро', () => {
    cy.get('div[title="Fill With Color"]').click();
  })
  it('ПокраскаФона', () => {
    cy.get('div[title="Fill With Color"]').should('be.visible').click();
    cy.get('div.canvas-area').should('be.visible').click();
  })
  it('ВернутьБелыйцвет', () => {
    cy.get('div[title="Fill With Color"]').should('be.visible').click();
    cy.get('div.canvas-area').should('be.visible').click();
    cy.get('.swatch.color-button').eq(14).click();
    cy.get('div.canvas-area').should('be.visible').click();
  })
  it('Нарисовать', () => {
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
    })
  })
  it('Проверка куки после входа через API', () => {
    cy.getCookie('session_token').should('exist'); 
    cy.visit('https://example.com/dashboard'); 
    cy.url().should('include', '/dashboard'); 
});
it('Проверка изменения цвета кисти', () => {
  // Выбрать цвет кисти (например, красный)
  cy.get('.swatch.color-button').eq(1).click();
  // Нарисовать многоугольник с красным цветом
  cy.get('div[title="Polygon"]').click();
  const handleSelector = 'div.canvas-area';
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
  });
  // Проверить, что многоугольник нарисован красным цветом
  // Здесь можно добавить проверку цвета, если это возможно в вашем приложении
  // Изменить цвет кисти (например, на синий)
  cy.get('.swatch.color-button').eq(2).click(); // Замените индекс на нужный для синего цвета
  cy.get('div[title="Polygon"]').click();
  const newClickCoordinates = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 150, y: 200 }
  ];
  newClickCoordinates.forEach((coord) => {
      cy.get(handleSelector)
        .click(coord.x, coord.y);
      cy.wait(500);
  });
  // Проверить, что новый многоугольник нарисован синим цветом
  // Здесь также можно добавить проверку цвета
});
})