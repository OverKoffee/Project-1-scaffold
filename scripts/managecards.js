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

  deleteCard(index) {
    this.flashcards.splice(index, 1);
    this.save();
  }

  updateCard(index, updatedCard) {
    this.flashcards[index] = { ...this.flashcard[index], ...updatedCard };
    this.save();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const manager = new FlashcardManager();
  const listContainer = document.getElementById("cardsList");
});
