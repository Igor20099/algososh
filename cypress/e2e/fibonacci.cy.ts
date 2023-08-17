import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { TEST_URL,TEST_CIRCLE } from "../../src/constants/test-constants";

describe("Страница fibonacci", function () {
   beforeEach(function () {
    cy.visit(`${TEST_URL}/fibonacci`);
  });

  it("Проверка заблокирована ли кнопка если input пуст", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Проверка на корректную генерацию чисел", function () {
    const numberForFibonacci = 5;
    const fibonacciArr = [1, 1, 2, 3, 5, 8];
    const color = "rgb(0, 50, 255)";

    cy.get("input").type(numberForFibonacci.toString());
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index) => {
      cy.wrap($el).contains(fibonacciArr[index]);
      cy.wrap($el).should("have.css", "border-color", color);
    });

    cy.wait(SHORT_DELAY_IN_MS);
  });
});