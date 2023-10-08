beforeEach(() => {
  cy.visit("/");
});

describe("Login page", () => {
  it("Visible page", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Happy path log in", () => {
    cy.login("test@test.com", "test");

    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Log out").should("be.visible");
  });

  it("Sad path email", () => {
    cy.login(null, "test");

    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
    });
  });

  it("Sad path password", () => {
    cy.login("test@test.com", null);

    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
    });
  });
});

describe("Books add", () => {
  it("Happy path add book 1984", () => {
    cy.login("test@test.com", "test");

    cy.addBooks("1984", "Антиутопия", "Дж. Оруэлл");
    cy.contains("1984").should("be.visible");
  });

  it("Happy path add book Potter", () => {
    cy.login("test@test.com", "test");

    cy.addBooks("Гарри Поттер", "Фэнтези", "Дж. К. Роулинг");
    cy.contains("Гарри Поттер").should("be.visible");
  });

  it("Add book to favorite", () => {
    cy.login("test@test.com", "test");

    cy.contains("1984").contains("Add to favorite").click();
    cy.get("h4").click();
    cy.contains("1984").should("be.visible");
  });

  it("Delete book from favorite", () => {
    cy.login("test@test.com", "test");

    cy.get("h4").click();
    cy.contains("1984").contains("Delete from favorite").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });
});
