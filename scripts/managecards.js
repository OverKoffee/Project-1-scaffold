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
  const cards = manager.getCards();
  const listContainer = document.getElementById("cardsList");

  // Expand container for managing cards
  document.querySelector(".container").style.maxWidth = "800px";

  if (!cards.length) {
    listContainer.innerHTML = "<p>Flashcard deck empty.</p>";
    return;
  }

  function showCardList() {
    const cards = manager.getCards();
    let cardEntryHTML = "";

    //build innerHTML for listContainer
    for (let i = 0; i < cards.length; i++) {
      cardEntryHTML =
        cardEntryHTML +
        `
        <div class="card-entry">
            <p><b>${cards[i].word}</b> : ${cards[i].front} : ${cards[i].back}</p> 
            <button class="uniform-btn" id="edit-btn" data-index="${i}">Edit</button>
            <button class="uniform-btn" id="delete-btn" data-index="${i}">Delete</button>
        </div>
        `;
    }

    listContainer.innerHTML = cardEntryHTML;
    console.log(`listContainer.innerHTML = ${listContainer.innerHTML}`);
    console.log(`cardEntryHTML = ${cardEntryHTML}`);
  }

  showCardList();
});
