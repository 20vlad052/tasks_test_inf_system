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
    // Логин пользователя
    cy.get('[data-test=username]').type('standard_user') 
    cy.get('[data-test=password]').type('secret_sauce') 
    cy.get('[data-test=login-button]').click() 

    // Функция для проверки сортировки цен
    const checkPriceSorting = (order) => {
        cy.get('.inventory_item_price').then(($prices) => { 
            const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get(); 
            const sortedPrices = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a); 
            expect(prices).to.deep.equal(sortedPrices); 
        });
    };

    // Сортировка по возрастанию цены
    cy.get('.product_sort_container').select('lohi'); 
    checkPriceSorting('asc');

    // Сортировка по убыванию цены
    cy.get('.product_sort_container').select('hilo'); 
    checkPriceSorting('desc');
});
it('Сортировка по алфавиту и проверка названий продуктов', () => { 
  // Логин пользователя
  cy.get('[data-test=username]').type('standard_user'); 
  cy.get('[data-test=password]').type('secret_sauce'); 
  cy.get('[data-test=login-button]').click(); 

  // Функция для проверки сортировки названий
  const checkAlphabeticalSorting = (order) => {
      cy.get('.inventory_item_name').then(($names) => { 
          const names = $names.map((index, html) => html.innerText).get(); 
          const sortedNames = [...names].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)); 
          expect(names).to.deep.equal(sortedNames); 
      });
  };

  // Сортировка по возрастанию (A-Z)
  cy.get('.product_sort_container').select('az'); 
  checkAlphabeticalSorting('asc');

  // Сортировка по убыванию (Z-A)
  cy.get('.product_sort_container').select('za'); 
  checkAlphabeticalSorting('desc');
}); 

// Как было до этого 


  //   // Сортировка по убыванию цены 
  //   cy.get('.product_sort_container').select('hilo') 
  //   cy.get('.inventory_item_price').then(($prices) => { 
  //     const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get() 
  //     const sortedPrices = [...prices].sort((a, b) => b - a) 
  //     expect(prices).to.deep.equal(sortedPrices) 
  //   }) 
  // }) 
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