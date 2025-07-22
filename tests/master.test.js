const FlashcardManager = require("../scripts/flashcardManager.js");

let flashcardEntry;

beforeEach(() => {
  flashcardEntry = null;

  global.localStorage = {
    getItem: jest.fn(() => null), // start empty
    setItem: jest.fn((key, value) => {
      // Capture for later inspection
      flashcardEntry = { name: key, data: value };
    }),
  };
});

describe("FlashcardManager", () => {
  test("Adding a new card saves JSON correctly in localStorage", () => {
    const manager = new FlashcardManager();
    manager.addCard("dog", "The dog is furry.", "dog: A lovely mammal.");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(flashcardEntry.name).toBe("flashcards");

    const data = JSON.parse(flashcardEntry.data);
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({
      word: "dog",
      front: "The dog is furry.",
      back: "dog: A lovely mammal.",
      status: "learning",
    });
  });
});

describe("Add Cards Page", () => {
  // will test the addcards.js functions, may do separate file
});

describe("Review Page", () => {
  // will test the review.js functions
});
