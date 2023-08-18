import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  TEST_URL,
  TEST_CIRCLE_CONTAINER,
  TEST_CIRCLE,
  TEST_ADD_BUTTON,
  TEST_REMOVE_BUTTON,
  TEST_CLEAR_BUTTON,
  TEST_INPUT,
} from "../../src/constants/test-constants";

describe("Cтраница stack", function () {
  beforeEach(function () {
    cy.visit(`${TEST_URL}/stack`);
  });

  it("Проверка заблокирована ли кнопка если input пуст", function () {
    cy.get(TEST_INPUT).should("be.empty");
    cy.get(TEST_ADD_BUTTON).should("be.disabled");
  });

  const modifiedColor = "4px solid rgb(210, 82, 225)";
  const defaultColor = "4px solid rgb(0, 50, 255)";

  const firstElement = "5";
  const secondElement = "7";

  it("Проверка на корректное довабление элемента", function () {
    cy.get(TEST_INPUT).first().as("input");
    cy.get(TEST_ADD_BUTTON).as("addButton");

    cy.get("@input").type(firstElement);
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).first().as("firstCircleContent");
    cy.get(TEST_CIRCLE).first().as("firstCircle");

    cy.get("@firstCircle").should("have.css", "border", modifiedColor);
    cy.get("@firstCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("top");

    cy.get("@input").type(secondElement);
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).eq(1).as("secondCircleContent");
    cy.get(TEST_CIRCLE).eq(1).as("secondCircle");

    cy.get("@secondCircle").should("have.css", "border", modifiedColor);
    cy.get("@secondCircle").should("have.css", "border", defaultColor);
    cy.get("@secondCircleContent").children().contains("top");
  });

  it("Проверка на корректное удаление элемента", function () {
    cy.get(TEST_INPUT).first().as("input");
    cy.get(TEST_ADD_BUTTON).as("addButton");
    cy.get(TEST_REMOVE_BUTTON).as("deleteButton");

    cy.get("@input").type(firstElement);
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).first().as("firstCircleContent");
    cy.get(TEST_CIRCLE).first().as("firstCircle");

    cy.get("@firstCircle").should("have.css", "border", modifiedColor);
    cy.get("@firstCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("top");

    cy.get("@input").type(secondElement);
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).eq(1).as("secondCircleContent");
    cy.get(TEST_CIRCLE).eq(1).as("secondCircle");

    cy.get("@secondCircle").should("have.css", "border", modifiedColor);
    cy.get("@secondCircle").should("have.css", "border", defaultColor);
    cy.get("@secondCircleContent").children().contains("top");

    cy.get("@deleteButton").click();

    cy.get("@secondCircle").should("have.css", "border", modifiedColor);
    cy.get("@secondCircle").should("not.exist");
    cy.get("@firstCircleContent").children().contains("top");
    cy.get("@firstCircle").should("have.text", firstElement);
  });

  it("Проверка кнопки очистить", function () {
    cy.get("input").should("be.empty");
    cy.get("input").type(firstElement);
    cy.get(TEST_ADD_BUTTON).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("input").should("be.empty");
    cy.get("input").type(secondElement);
    cy.get(TEST_ADD_BUTTON).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(TEST_CLEAR_BUTTON).click();
    cy.get(TEST_CIRCLE_CONTAINER).should("have.length", 0);
  });
});
