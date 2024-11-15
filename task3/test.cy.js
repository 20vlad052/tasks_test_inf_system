/// <reference types="cypress" />
describe('вход', () => { 
    beforeEach(() => { 
      cy.visit('https://www.saucedemo.com') 
   
    }) 
    it('заполнение логина и пароля', () => { 
      const username = 'standard_user'; 
      cy.get('[data-test=username]').type(`standard_user`); 
      const pass = 'secret_sauce'; 
      cy.get('input#password').type(`${pass}{enter}`); 
      cy.url().should('include', '/inventory.html') 
    }) 
    it('Сортировка по цене и проверка цен что отфильтровалось в зависимости от стратегии asc/desc', () => { 
      cy.get('[data-test=username]').type('standard_user') 
      cy.get('[data-test=password]').type('secret_sauce') 
      cy.get('[data-test=login-button]').click() 
   
      // Сортировка по возрастанию цены 
      cy.get('.product_sort_container').select('lohi') 
   
      cy.get('.inventory_item_price').then(($prices) => { 
        const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get() 
        const sortedPrices = [...prices].sort((a, b) => a - b) 
        expect(prices).to.deep.equal(sortedPrices) 
      }) 
   
      // Сортировка по убыванию цены 
      cy.get('.product_sort_container').select('hilo') 
      cy.get('.inventory_item_price').then(($prices) => { 
        const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get() 
        const sortedPrices = [...prices].sort((a, b) => b - a) 
        expect(prices).to.deep.equal(sortedPrices) 
      }) 
    }) 
    it('Добавление двух товаров в корзину и создание заказа', () => { 
      cy.get('[data-test=username]').type('standard_user') 
      cy.get('[data-test=password]').type('secret_sauce') 
      cy.get('[data-test=login-button]').click() 
      cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click() 
      cy.get('[data-test=add-to-cart-sauce-labs-bolt-t-shirt]').click() 
      cy.get('[data-test=shopping-cart-link]').click() 
      cy.get('[data-test=checkout]').click() 
      cy.get('[data-test=firstName]').type('standard_user') 
      cy.get('[data-test=lastName]').type('secret_sauce') 
      cy.get('[data-test=postalCode]').type('ижевск') 
      cy.get('[data-test=continue]').click() 
      cy.get('[data-test=finish]').click() 
    }) 
  })