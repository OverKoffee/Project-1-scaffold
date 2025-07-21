document.addEventListener("DOMContentLoaded", () => {
  const flashcardManager = new FlashcardManager();
  const path = window.location.pathname;
  if (path.endsWith("addcards.html")) {
    initializeAddCardPage(flashcardManager);
  }
});

function initializeAddCardPage(flashcardManager) {
  const learnwordInput = document.getElementById("learnword");
  const fetchBtn = document.getElementById("fetchBtn");
  const flashcardFields = document.getElementById("flashcard-form");
  const cardForm = document.getElementById("fetchcard-form");
  const frontCard = document.getElementById("frontCard");
  const backCard = document.getElementById("backCard");
  const saveCardBtn = document.getElementById("saveCardBtn");
  const backCardBtn = document.getElementById("backCardBtn");
  let learnWord = ""; // track the word the user is adding

  const resetFlashcardForm = () => {
    frontCard.value = "";
    backCard.value = "";
    flashcardFields.style.display = "none";
    cardForm.style.display = "block";
    learnwordInput.value = "";
    learnwordInput.focus();
  };

  /* --- Below container, show a status text, then fade away --- */
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

  /* --- Button Listeners --- */
  fetchBtn.addEventListener("click", () => {
    const word = learnwordInput.value.trim();
    learnWord = word;

    if (!word) {
      alert("Please enter a word first.");
      return;
    }

    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) throw new Error("Word not found.");
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);

        const definition = data[0].meanings[0].definitions[0].definition;
        const exampleSentence =
          data[0].meanings[0].definitions[0].example ||
          `Example for "${word}" does not exist--paste your own.`;

        frontCard.value = exampleSentence;
        backCard.value = `${word}: ${definition}`;

        cardForm.style.display = "none";
        flashcardFields.style.display = "block";
      })
      .catch((err) => {
        console.error(err);
        alert("That word doesn't exist in the dictionary!");
      });
  });

  saveCardBtn.addEventListener("click", () => {
    const front = frontCard.value.trim();
    const back = backCard.value.trim();

    if (front.length === 0 || back.length === 0) {
      alert("Both cards must not be empty!");
      return;
    }

    flashcardManager.addCard(learnWord, front, back);

    showAndFadeMessage("Card saved...");

    resetFlashcardForm();
    updateFlashcardStats();
  });

  backCardBtn.addEventListener("click", () => {
    resetFlashcardForm();
  });
  /* --- End of Button Listeners --- */
}
