const bunId = '643d69a5c3f7b9001cfa093c';
const sauceId = '643d69a5c3f7b9001cfa0943';
const main1Id = '643d69a5c3f7b9001cfa093e';
const main2Id = '643d69a5c3f7b9001cfa0946';

const orderResponse = {
  success: true,
  name: 'Краторный space минеральный люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '66953696119d45001b4f90d8',
    owner: {
      name: 'asd',
      email: 'qwe@test.ru',
      createdAt: '2024-07-08T18:26:35.819Z',
      updatedAt: '2024-07-08T20:11:22.933Z'
    },
    status: 'done',
    name: 'Краторный space минеральный люминесцентный бургер',
    createdAt: '2024-07-15T14:47:50.047Z',
    updatedAt: '2024-07-15T14:47:50.445Z',
    number: 45888,
    price: 2623
  }
};

describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.intercept('POST', 'api/auth/login', {
      fixture: 'login.json'
    });

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie(
      'accessToken',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGMyZjViMTE5ZDQ1MDAxYjRmNTVkMSIsImlhdCI6MTcyMTA1NTI3MywiZXhwIjoxNzIxMDU2NDczfQ.YAP0MVANkX9bGQVV-Ndkjge0BEZGMgla1rwt7Si4Qo8`
    );
    window.localStorage.setItem(
      'refreshToken',
      '7848c013ef99b90baf09172d3ff23962362a2457a1c290a5e508c04b968fc6c133a5573b91dd38f7'
    );

    cy.visit('/');
    cy.get(`[data-cy=ingredient-${bunId}]`).as('bun');
    cy.get(`[data-cy=ingredient-${main1Id}]`).as('main1');
    cy.get(`[data-cy=ingredient-${main2Id}]`).as('main2');
    cy.get(`[data-cy=ingredient-${sauceId}]`).as('sauce');
    cy.get('@bun').find('button').as('bunBtn');
    cy.get('@main1').find('button').as('main1Btn');
    cy.get('@main2').find('button').as('main2Btn');
    cy.get('@sauce').find('button').as('sauceBtn');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Test loading', () => {
    it('Get ingredients request with success response', () => {
      cy.get('@bun').should('contain', 'Краторная булка N-200i');

      cy.get('@main1').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );

      cy.get('@main2').should('contain', 'Хрустящие минеральные кольца');

      cy.get('@sauce').should('contain', 'Соус фирменный Space Sauce');
    });
  });

  describe('Test adding ingredient', () => {
    it('Add ingredients to constructor by click add button on it', () => {
      cy.get('@bunBtn').click();
      cy.get('@main1Btn').click();
      cy.get('@main2Btn').click();
      cy.get('@sauceBtn').click();

      cy.get(`[data-cy="bun-top-place-${bunId}"]`).should('exist');

      cy.get(`[data-cy="bun-bottom-place-${bunId}"]`).should('exist');

      cy.get(`[data-cy="ingredient-place-${main1Id}"]`).should('exist');

      cy.get(`[data-cy="ingredient-place-${main2Id}"]`).should('exist');

      cy.get(`[data-cy="ingredient-place-${sauceId}"]`).should('exist');
    });
  });

  describe('Test ingredient in modal', () => {
    it('Open ingredient in modal by click on it', () => {
      cy.get('@bun').click();
      cy.location('pathname').should('eq', `/ingredients/${bunId}`);
      cy.get(`[data-cy="ingredient-details-${bunId}"]`).as(
        'bun-modal-ingredient'
      );
      cy.get('@bun-modal-ingredient').should('exist');

      cy.get('@bun-modal-ingredient')
        .find('h3')
        .should('contain', 'Краторная булка');
    });

    it('Close modal by click on close button', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.location('pathname').should('eq', '/');
    });

    it('Close modal by click on overlay', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('Test order', () => {
    it('Make order', () => {
      cy.get('@bunBtn').click();
      cy.get('@main1Btn').click();
      cy.get('@main2Btn').click();
      cy.get('@sauceBtn').click();

      cy.get('[data-cy="order-button"]').click();

      cy.get('@createOrder')
        .wait('@createOrder')
        .then((intercept) => {
          expect(intercept.response?.statusCode).to.eq(200);
          expect(intercept.response?.body).to.deep.eq(orderResponse);
        });

      cy.get('[data-cy="modal-order-title"]').should('contain', '45888');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal-overlay"]').should('not.exist');

      cy.get('[data-cy="burger-constructor"]')
        .find('div')
        .should('contain', 'Выберите булки');

      cy.get('[data-cy="burger-constructor"]')
        .find('ul')
        .find('div')
        .should('contain', 'Выберите начинку');
    });
  });
});
