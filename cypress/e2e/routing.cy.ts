import {TEST_URL} from '../../src/constants/test-constants'

describe("Проверка переходов на страницы в приложении", function () {
    before(function () {
      cy.visit(TEST_URL);
    });
  
    it("Открывается ли страница string", function () {
      cy.visit(`${TEST_URL}/recursion`);
    });
  
    it("Открывается ли страница fibonacci", function () {
      cy.visit(`${TEST_URL}/fibonacci`);
    });
  
    it("Открывается ли страница sorting", function () {
      cy.visit(`${TEST_URL}/sorting`);
    });
  
    it("Открывается ли страница stack", function () {
      cy.visit(`${TEST_URL}/stack`);
    });
  
    it("Открывается ли страница queue", function () {
      cy.visit(`${TEST_URL}/queue`);
    });
  
    it("Открывается ли страница list", function () {
      cy.visit(`${TEST_URL}/list`);
    });
  });