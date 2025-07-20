function updateFlashcardStats() {
  const statsElement = document.getElementById("flashcardStats");
  if (!statsElement) return;

  const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
  const totalCards = flashcards.length;
  const learningCards = flashcards.filter(
    (c) => c.status === "learning"
  ).length;

  if (totalCards === 0) {
    statsElement.textContent = `0 total cards - 0 need review`;
  } else {
    statsElement.textContent = `${totalCards} total cards - ${learningCards} need review`;
  }
}

// Initialize the card counter when the page loads
document.addEventListener("DOMContentLoaded", updateFlashcardStats);
