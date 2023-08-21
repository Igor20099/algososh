import {TEST_URL} from '../../src/constants/test-constants'

describe("Доступность приложения", function () {
  it("Доступно ли приложение по адресу http://localhost:3000", function () {
    cy.visit(TEST_URL);
  });
});