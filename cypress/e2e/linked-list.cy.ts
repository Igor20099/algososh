import { should } from "chai";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

import {
  TEST_URL,
  TEST_INPUT,
  TEST_ADD_HEAD_BUTTON,
  TEST_ADD_TAIL_BUTTON,
  TEST_REMOVE_HEAD_BUTTON,
  TEST_REMOVE_TAIL_BUTTON,
  TEST_INPUT_INDEX,
  TEST_ADD_INDEX_BUTTON,
  TEST_REMOVE_INDEX_BUTTON,
  TEST_SMALL_CIRCLE,
  TEST_CIRCLE,
  TEST_CIRCLE_CONTAINER,
  TEST_TOP_CIRCLE,
  TEST_BOTTOM_CIRCLE,
  TEST_HEAD_CIRCLE,
  TEST_TAIL_CIRCLE,
  TEST_INDEX_CIRCLE,
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR,
  TEST_LETTER_CIRCLE,
} from "../../src/constants/test-constants";

describe("Страница linked list", function () {
  beforeEach(function () {
    cy.visit(`${TEST_URL}/list`);
  });

  const index = 2;

  it("Проверка заблокированы ли кнопки если input пуст", () => {
    cy.get(TEST_INPUT).should("be.empty");
    cy.get(TEST_ADD_HEAD_BUTTON).should("be.disabled");
    cy.get(TEST_ADD_TAIL_BUTTON).should("be.disabled");
    cy.get(TEST_ADD_INDEX_BUTTON).should("be.disabled");
    cy.get(TEST_REMOVE_INDEX_BUTTON).should("be.disabled");
  });

  it("Проверка на отрисовку дефолтного списка", () => {
    cy.get(TEST_CIRCLE).each((item, index, list) => {
      cy.wrap(list).should("exist");
      cy.wrap(list).should("have.length", 4);
    });
    cy.get(TEST_CIRCLE).each((item) => {
      cy.wrap(item).should("not.have.text", "");
    });
  });

  it("Проверка на добавления элемента в head", () => {
    cy.get(TEST_INPUT).type("5");
    cy.get(TEST_ADD_HEAD_BUTTON).click();

    cy.get(TEST_SMALL_CIRCLE).should("have.text", "5");

    cy.get(TEST_SMALL_CIRCLE).should(
      "have.css",
      "border-color",
      CHANGING_COLOR
    );
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");
    cy.get(TEST_CIRCLE)
      .eq(0)
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(TEST_CIRCLE).eq(0).should("have.text", "5");
    cy.get(TEST_HEAD_CIRCLE).should("have.text", "head");
    cy.get(TEST_CIRCLE).eq(0).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).should("have.length", "5");
  });

  it("Проверка на добавления элемента в tail", () => {
    cy.get(TEST_INPUT).type("1");
    cy.get(TEST_ADD_TAIL_BUTTON).click();
    cy.get(TEST_SMALL_CIRCLE).should("have.text", "1");
    cy.get(TEST_SMALL_CIRCLE).should(
      "have.css",
      "border-color",
      CHANGING_COLOR
    );
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");
    cy.get(TEST_CIRCLE)
      .last()
      .should("have.css", "border-color", MODIFIED_COLOR);
    cy.get(TEST_CIRCLE).last().should("have.text", "1");
    cy.get(TEST_TAIL_CIRCLE).should("have.text", "tail");
    cy.get(TEST_CIRCLE)
      .last()
      .should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).should("have.length", "5");
  });

  it("Проверка на добавления элемента по индексу", () => {
    cy.get(TEST_INPUT).type("6");
    cy.get(TEST_INPUT_INDEX).type(index.toString());
    cy.get(TEST_ADD_INDEX_BUTTON).click();
    cy.get(TEST_SMALL_CIRCLE).should("have.text", "6");
    cy.get(TEST_SMALL_CIRCLE).should(
      "have.css",
      "border-color",
      CHANGING_COLOR
    );
    cy.get(TEST_CIRCLE)
      .eq(1)
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(TEST_CIRCLE)
      .eq(2)
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");
    cy.get(TEST_CIRCLE).eq(0).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).eq(1).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).should("have.length", "5");
  });

  it("Проверка на удаление элемента в head", () => {
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).should("have.length", "4");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(TEST_REMOVE_HEAD_BUTTON).click();
    cy.get(TEST_SMALL_CIRCLE).should("not.have.text", "");
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");

    cy.get(TEST_CIRCLE).should("have.length", "3");
  });

  it("Проверка на удаление элемента в tail", () => {
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).should("have.length", "4");

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(TEST_REMOVE_TAIL_BUTTON).click();
    cy.get(TEST_SMALL_CIRCLE).should("not.have.text", "");
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");

    cy.get(TEST_CIRCLE).should("have.length", "3");
  });

  it("Проверка на удаление элемента по индексу", () => {
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CIRCLE).should("have.length", "4");

    cy.get(TEST_INPUT_INDEX).type(index.toString());

    cy.get(TEST_REMOVE_INDEX_BUTTON).click();
    cy.get(TEST_CIRCLE)
      .eq(0)
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(TEST_CIRCLE)
      .eq(1)
      .should("have.css", "border-color", CHANGING_COLOR);
    cy.get(TEST_SMALL_CIRCLE).should("not.have.text", "");
    cy.get(TEST_CIRCLE).eq(2).should("have.text", "");
    cy.get(TEST_SMALL_CIRCLE).should("not.exist");
    cy.get(TEST_CIRCLE).each(($el, index, $list) => {
      cy.wrap($list).should("have.length", "3");
    });
    cy.get(TEST_CIRCLE).eq(0).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).eq(1).should("have.css", "border-color", DEFAULT_COLOR);
    cy.get(TEST_CIRCLE).should("have.length", "3");
  });
});
