import {
  TEST_URL,
  TEST_ADD_BUTTON,
  TEST_REMOVE_BUTTON,
  TEST_CLEAR_BUTTON,
  TEST_INPUT,
  TEST_CIRCLE_CONTAINER,
  TEST_CIRCLE,
} from "../../src/constants/test-constants";

describe("Cтраница queue", function () {
  beforeEach(function () {
    cy.visit(`${TEST_URL}/queue`);
  });

  const modifiedColor = "4px solid rgb(210, 82, 225)";
  const defaultColor = "4px solid rgb(0, 50, 255)";

  it("Проверка заблокирована ли кнопка если input пуст", function () {
    cy.get(TEST_INPUT).should("be.empty");
    cy.get(TEST_ADD_BUTTON).should("be.disabled");
  });

  it("Проверка на корректное довабление элемента", function () {
    cy.get(TEST_INPUT).first().as("input");
    cy.get(TEST_ADD_BUTTON).as("addButton");

    cy.get("@input").type("5");
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).first().as("firstCircleContent");
    cy.get(TEST_CIRCLE).first().as("firstCircle");

    cy.get("@firstCircle").should("have.css", "border", modifiedColor);
    cy.get("@firstCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("head");
    cy.get("@firstCircleContent").children().contains("tail");

    cy.get("@input").type("7");
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).eq(1).as("secondCircleContent");
    cy.get(TEST_CIRCLE).eq(1).as("secondCircle");

    cy.get("@secondCircle").should("have.css", "border", modifiedColor);
    cy.get("@secondCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("head");
    cy.get("@secondCircleContent").children().contains("tail");
  });

  it("Проверка на корректное удаление элемента", function () {
    cy.get(TEST_INPUT).first().as("input");
    cy.get(TEST_ADD_BUTTON).as("addButton");
    cy.get(TEST_REMOVE_BUTTON).as("removeButton");

    cy.get("@input").type("2");
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).first().as("firstCircleContent");
    cy.get(TEST_CIRCLE).first().as("firstCircle");

    cy.get("@firstCircle").should("have.css", "border", modifiedColor);
    cy.get("@firstCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("head");
    cy.get("@firstCircleContent").children().contains("tail");

    cy.get("@input").type("1");
    cy.get("@addButton").click();

    cy.get(TEST_CIRCLE_CONTAINER).eq(1).as("secondCircleContent");
    cy.get(TEST_CIRCLE).eq(1).as("secondCircle");

    cy.get("@secondCircle").should("have.css", "border", modifiedColor);
    cy.get("@secondCircle").should("have.css", "border", defaultColor);
    cy.get("@firstCircleContent").children().contains("head");
    cy.get("@secondCircleContent").children().contains("tail");

    cy.get("@removeButton").click();

    cy.get("@firstCircle").should("have.text", "");
    cy.get("@secondCircle").should("have.css", "border", defaultColor);
    cy.get("@secondCircleContent").children().contains("head");
    cy.get("@secondCircleContent").children().contains("tail");
  });

  it("Проверка кнопки очистить", function () {
    cy.get(TEST_INPUT).first().as("input");
    cy.get(TEST_ADD_BUTTON).as("addButton");
    cy.get(TEST_CLEAR_BUTTON).as("clearButton");

    cy.get("@input").type("4");
    cy.get("@addButton").click();

    cy.get("@input").type("2");
    cy.get("@addButton").click();

    cy.get("@input").type("5");
    cy.get("@addButton").click();

    cy.get("@clearButton").click();

    cy.get(TEST_CIRCLE).first().as("firstCircle");
    cy.get(TEST_CIRCLE).eq(1).as("secondCircle");
    cy.get(TEST_CIRCLE).eq(2).as("thirdCircle");
    cy.get(TEST_CIRCLE).eq(3).as("forthCircle");
    cy.get(TEST_CIRCLE).eq(4).as("fifthCircle");
    cy.get(TEST_CIRCLE).eq(5).as("sixthCircle");
    cy.get(TEST_CIRCLE).eq(6).as("seventhCircle");

    cy.get("@firstCircle").should("have.text", "");
    cy.get("@secondCircle").should("have.text", "");
    cy.get("@thirdCircle").should("have.text", "");
    cy.get("@forthCircle").should("have.text", "");
    cy.get("@fifthCircle").should("have.text", "");
    cy.get("@sixthCircle").should("have.text", "");
    cy.get("@seventhCircle").should("have.text", "");
  });
});
