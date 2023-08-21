import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  TEST_URL,
  TEST_CIRCLE,
  CHANGING_COLOR,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/test-constants";

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
      CHANGING_COLOR,
      DEFAULT_COLOR,
      DEFAULT_COLOR,
      DEFAULT_COLOR,
      CHANGING_COLOR,
    ];

    const inProcessString = "oellh";
    const secondStepColorsArr = [
      MODIFIED_COLOR,
      CHANGING_COLOR,
      DEFAULT_COLOR,
      CHANGING_COLOR,
      MODIFIED_COLOR,
    ];

    const finalString = "olleh";
    const finaStepColorsArr = [
      MODIFIED_COLOR,
      MODIFIED_COLOR,
      MODIFIED_COLOR,
      MODIFIED_COLOR,
      MODIFIED_COLOR,
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
