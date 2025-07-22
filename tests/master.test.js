const FlashcardManager = require("../scripts/flashcardManager.js");

let flashcardEntry;
flashcardEntry = null;

global.localStorage = {
  getItem: jest.fn(() => null), // start empty
  setItem: jest.fn((key, value) => {
    flashcardEntry = { name: key, data: value };
  }),
};

describe("FlashcardManager", () => {
  test("Adding a new card saves JSON correctly in localStorage", () => {
    const manager = new FlashcardManager();
    manager.addCard("dog", "The dog is furry.", "dog: A lovely mammal.");
    manager.addCard("cat", "The cat is less furry.", "cat: A nasty mammal.");

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(flashcardEntry.name).toBe("flashcards");

    const data = JSON.parse(flashcardEntry.data);
    expect(data).toHaveLength(2);
    expect(data[0]).toMatchObject({
      word: "dog",
      front: "The dog is furry.",
      back: "dog: A lovely mammal.",
      status: "learning",
    });
    expect(data[1]).toMatchObject({
      word: "cat",
      front: "The cat is less furry.",
      back: "cat: A nasty mammal.",
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
