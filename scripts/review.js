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

// IDEA - add leaderboard ranking;
// allow user to put username for new flashcard session,
// otherwise load existing flashcards for the existing user

document.addEventListener("DOMContentLoaded", () => {
  const manager = new FlashcardManager();
  let flashcards = manager.getCards();
  let currentIndex = 0;
  let displayedIndex = 0;

  const reviewArea = document.getElementById("reviewArea");
  const cardFront = document.getElementById("cardFront");
  const cardBack = document.getElementById("cardBack");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const backSection = document.getElementById("backSection");
  const markLearnedBtn = document.getElementById("markLearnedBtn");
  const nextCardBtn = document.getElementById("nextCardBtn");

  if (flashcards.length !== 0) {
    console.log("backSection is: " + backSection.style.display);
    console.log("reviewArea is: " + reviewArea.style.display);
    reviewArea.style.display = "block";
  } else {
    console.log("it is set to none");
    reviewArea.style.display = "none";
  }

  function showCard(index) {
    const card = flashcards[index];
    displayedIndex = index;

    cardFront.textContent = card.front;
    cardBack.textContent = card.back;

    hideBackSection();
  }

  function nextCard() {
    let startIndex = currentIndex;
    let found = false;

    do {
      currentIndex++;
      if (currentIndex >= flashcards.length) {
        currentIndex = 0; // restart
      }

      if (flashcards[currentIndex].status === "learning") {
        found = true;
      }
    } while (!found && currentIndex !== startIndex);

    if (found) {
      showCard(currentIndex);
    } else {
      alert("Congrats, you're American now!");
    }
  }

  showCard(currentIndex);

  showAnswerBtn.addEventListener("click", () => {
    showBackSection();
  });

  markLearnedBtn.addEventListener("click", () => {
    manager.markLearned(displayedIndex);

    flashcards = manager.getCards();
    alert("Marked as learned!");

    if (typeof updateFlashcardStats === "function") {
      updateFlashcardStats();
    }

    nextCard();
  });

  nextCardBtn.addEventListener("click", () => {
    nextCard();
  });

  function showBackSection() {
    backSection.style.display = "block";
    showAnswerBtn.style.display = "none";
  }

  function hideBackSection() {
    backSection.style.display = "none";
    showAnswerBtn.style.display = "block";
  }
});
