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

  markLearned(index) {
    if (this.flashcards[index]) {
      this.flashcards[index].status = "learned";
      this.save();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const manager = new FlashcardManager();
  let flashcards = manager.getCards();
  let currentIndex = 0;

  const noCards = document.getElementById("noCards");
  const reviewArea = document.getElementById("reviewArea");
  const cardFront = document.getElementById("cardFront");
  const cardBack = document.getElementById("cardBack");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const backSection = document.getElementById("backSection");
  const markLearnedBtn = document.getElementById("markLearnedBtn");
  const nextCardBtn = document.getElementById("nextCardBtn");

  if (flashcards.length === 0) {
    noCards.style.display = "block";
    return;
  } else {
    reviewArea.style.display = "block";
  }

  function showCard(index) {
    const card = flashcards[index];
    cardFront.textContent = card.front;
    cardBack.textContent = card.back;
    backSection.style.display = "none";
    showAnswerBtn.style.display = "block";
  }

  function nextCard() {
    currentIndex++;
    if (currentIndex >= flashcards.length) {
      alert("Congrats, you're American now!");
      currentIndex = 0;
    }
    showCard(currentIndex);
  }

  showCard(currentIndex);

  showAnswerBtn.addEventListener("click", () => {
    backSection.style.display = "block";
    showAnswerBtn.style.display = "none";
  });

  markLearnedBtn.addEventListener("click", () => {
    manager.markLearned(currentIndex);
    flashcards = manager.getCards();
    alert("Marked as learned!");
  });

  nextCardBtn.addEventListener("click", () => {
    nextCard();
  });
});
