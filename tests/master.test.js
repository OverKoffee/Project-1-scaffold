const FlashcardManager = require("../scripts/flashcardManager.js");

beforeEach(() => {
  // need to mock localStorage here
});

describe("FlashcardManager", () => {
  test("First time use should start with an empty flashcard deck", () => {
    const manager = new FlashcardManager();
    expect(manager.getCards()).toEqual([]);
  });
});

describe("Add Cards Page", () => {
  // will test the addcards.js functions
});

describe("Review Page", () => {
  // // will test the review.js functions
});
