document.addEventListener("DOMContentLoaded", () => {
  const flashcardManager = new FlashcardManager();
  let flashcards = flashcardManager.getCards();
  let currentIndex = 0;
  let displayedCardIndex = 0;

  const cardFront = document.getElementById("card-front");
  const cardBack = document.getElementById("card-back");
  const showAnswerBtn = document.getElementById("show-answer-btn");
  const backSection = document.getElementById("back-section");
  const markLearnedBtn = document.getElementById("mark-learned-btn");
  const nextCardBtn = document.getElementById("next-card-btn");

  const completedReviewText = `<h1>Congrats! You're American now!</h1>
         <a href="/index.html" class="uniform-btn">Back</a>`;

  if (allCardsLearned()) {
    document.querySelector(".container").innerHTML = completedReviewText;
    return;
  }

  function showCard(index) {
    const card = flashcards[index];
    displayedCardIndex = index;
    cardFront.innerHTML = card.front.replace(
      new RegExp(`\\b${card.word}\\b`, "gi"),
      `<b>${card.word}</b>`
    );
    cardBack.innerHTML = card.back.replace(
      new RegExp(`\\b${card.word}\\b`, "gi"),
      `<b>${card.word}</b>`
    );
    showBackSection(false);
  }

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

  nextCard();

  showAnswerBtn.addEventListener("click", () => {
    showBackSection(true);
  });

  markLearnedBtn.addEventListener("click", () => {
    flashcardManager.markLearned(displayedCardIndex);
    flashcards = flashcardManager.getCards();
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

  function showBackSection(visible) {
    if (visible) {
      backSection.style.display = "block";
      showAnswerBtn.style.display = "none";
    } else if (!visible) {
      backSection.style.display = "none";
      showAnswerBtn.style.display = "block";
    }
  }

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

  function allCardsLearned() {
    return flashcards.every((card) => card.status === "learned");
  }
});
