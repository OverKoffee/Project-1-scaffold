class FlashcardManager {
  constructor() {
    this.flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
  }

  save() {
    localStorage.setItem("flashcards", JSON.stringify(this.flashcards));
  }

  getCards() {
    return this.flashcards;
  }

  addCard(word, front, back) {
    const newCard = { word, front, back, status: "learning" };
    this.flashcards.push(newCard);
    this.save();
  }

  markLearned(index) {
    if (this.flashcards[index]) {
      this.flashcards[index].status = "learned";
      this.save();
    }
  }

  deleteCard(index) {
    this.flashcards.splice(index, 1);
    this.save();
  }

  updateCard(index, updatedCard) {
    this.flashcards[index] = { ...this.flashcards[index], ...updatedCard };
    this.save();
  }
}

module.exports = FlashcardManager;
