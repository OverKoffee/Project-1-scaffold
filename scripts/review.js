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

/* 
IDEA - if time allows, add leaderboard ranking;
allow user to put username for new flashcard session,
otherwise load existing flashcards for the existing user,
include username property to attribute each card to a user
*/

document.addEventListener("DOMContentLoaded", () => {
  const manager = new FlashcardManager();
  let flashcards = manager.getCards();
  let currentIndex = 0;
  let displayedIndex = 0;

  const cardFront = document.getElementById("cardFront");
  const cardBack = document.getElementById("cardBack");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const backSection = document.getElementById("backSection");
  const markLearnedBtn = document.getElementById("markLearnedBtn");
  const nextCardBtn = document.getElementById("nextCardBtn");
  const completedReviewText = `<h1>Congrats! You're American now!</h1>
         <a href="/index.html" class="uniform-btn">Back</a>`;

  /* --- Check first if there are reviews to do --- */
  if (allCardsLearned()) {
    document.querySelector(".container").innerHTML = completedReviewText;
    return;
  }

  function showCard(index) {
    const card = flashcards[index];
    displayedIndex = index;
    cardFront.textContent = card.front;
    cardBack.textContent = card.back;
    showBackSection(false);
  }

  /* --- User clicks "Next Card" - skips current card --- */
  function nextCard() {
    const n = flashcards.length;
    for (let i = 1; i <= n; i++) {
      const index = (currentIndex + i) % n;
      if (flashcards[index].status === "learning") {
        currentIndex = index;
        return showCard(index);
      }
    }

    if (allCardsLearned()) {
      document.querySelector(".container").innerHTML = completedReviewText;
    }
  }

  /* --- Default show first "learning" card --- */
  showCard(currentIndex);

  /* --- Button Listeners --- */
  showAnswerBtn.addEventListener("click", () => {
    showBackSection(true);
  });

  markLearnedBtn.addEventListener("click", () => {
    manager.markLearned(displayedIndex);
    flashcards = manager.getCards();
    showAndFadeMessage("Card learned...");
    if (typeof updateFlashcardStats === "function") {
      updateFlashcardStats();
    }
    nextCard();
  });

  nextCardBtn.addEventListener("click", () => {
    showAndFadeMessage("Card skipped...");
    nextCard();
  });
  /* --- End of Button Listeners --- */

  /* --- Toggle show/hide for Back card section --- */
  function showBackSection(visible) {
    if (visible) {
      backSection.style.display = "block";
      showAnswerBtn.style.display = "none";
    } else if (!visible) {
      backSection.style.display = "none";
      showAnswerBtn.style.display = "block";
    }
  }

  /* --- Below container, show a status text, then fade it away --- */
  function showAndFadeMessage(message) {
    const fadeResponse = document.getElementById("fadeResponseText");
    fadeResponse.textContent = message;
    fadeResponse.classList.remove("fade-out");
    fadeResponse.classList.add("show");

    setTimeout(() => {
      fadeResponse.classList.remove("show");
      fadeResponse.classList.add("fade-out");
    }, 400);
  }

  /* --- Determine if all reviews are complete --- */
  function allCardsLearned() {
    return flashcards.every((card) => card.status === "learned");
  }
});
