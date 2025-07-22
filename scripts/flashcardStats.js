function updateFlashcardStats() {
  const statsElement = document.getElementById("flashcardStats");
  const manageCardsLink = `<a href="/pages/managecards.html" 
                             style="text-decoration: underline; 
                             color: #6f4e37"> total cards</a>
                          `;

  if (!statsElement) return;

  const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
  const totalCards = flashcards.length;
  const learningCards = flashcards.filter(
    (c) => c.status === "learning"
  ).length;

  if (totalCards === 0) {
    statsElement.textContent = `0 total cards - 0 need review`;
  } else {
    statsElement.innerHTML = `${totalCards} ${manageCardsLink} - ${learningCards} need review`;
  }
}

document.addEventListener("DOMContentLoaded", updateFlashcardStats);
