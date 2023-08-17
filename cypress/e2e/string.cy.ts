import { DELAY_IN_MS } from "../../src/constants/delays";
import { TEST_URL,TEST_CIRCLE } from "../../src/constants/test-constants";

describe("Страница string", function () {
  beforeEach(function () {
    cy.visit(`${TEST_URL}/recursion`);
  });

  it("Проверка заблокирована ли кнопка если input пуст", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Проверка на корректный переворот строки", function () {
    const stringLength = 5;

    const originalString = "hello";
    const firstStepColorsArr = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const inProcessString = "oellh";
    const secondStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const finalString = "olleh";
    const finaStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.get("input").type(originalString);
    cy.get("button").should("not.be.disabled");
    cy.get("button[type='submit']").click();

    cy.get(TEST_CIRCLE).each(($el, index, $list) => {
      cy.wrap($list).should("have.length", stringLength);
      cy.wrap($el).contains(originalString[index]);
      cy.wrap($el).should(
        "have.css",
        "border-color",
        firstStepColorsArr[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index, $list) => {
      cy.wrap($list).should("have.length", stringLength);
      cy.wrap($el).contains(inProcessString[index]);
      cy.wrap($el).should(
        "have.css",
        "border-color",
        secondStepColorsArr[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(TEST_CIRCLE).each(($el, index, $list) => {
      cy.wrap($list).should("have.length", stringLength);
      cy.wrap($el).contains(finalString[index]);
      cy.wrap($el).should("have.css", "border-color", finaStepColorsArr[index]);
    });
  });
});
