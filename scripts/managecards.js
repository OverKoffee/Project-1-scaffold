document.addEventListener("DOMContentLoaded", () => {
  const flashcardManager = new FlashcardManager();
  const cards = flashcardManager.getCards();
  const listContainer = document.getElementById("cardsList");

  // Expand container for managing cards
  document.querySelector(".container").style.maxWidth = "800px";

  if (!cards.length) {
    listContainer.innerHTML = "<p>Flashcard deck empty.</p>";
    return;
  }

  function showCardList() {
    const cards = flashcardManager.getCards();
    let cardEntryHTML = "";

    //build innerHTML for listContainer
    for (let i = 0; i < cards.length; i++) {
      cardEntryHTML =
        cardEntryHTML +
        `
        <div class="card-entry">
            <p><b>${cards[i].word}</b> : ${cards[i].front} : ${cards[i].back}</p> 
            <button class="uniform-btn delete-btn" data-index="${i}">Delete</button>
        </div>
        `;
    }

    listContainer.innerHTML = cardEntryHTML;

    attachDeleteListeners();
  }

  function attachDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index; // get card index
        if (confirm("Delete this card?")) {
          flashcardManager.deleteCard(index);
          showCardList();
        }
      });
    });
  }

  showCardList();
});
