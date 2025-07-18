document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("addcards.html")) {
    initializeAddCardPage();
  }
});

function initializeAddCardPage() {
  const learnwordInput = document.getElementById("learnword");
  const fetchBtn = document.getElementById("fetchBtn");
  const flashcardFields = document.getElementById("flashcardFields");
  const cardForm = document.getElementById("card-form");

  const frontCard = document.getElementById("frontCard");
  const backCard = document.getElementById("backCard");

  fetchBtn.addEventListener("click", async () => {
    const word = learnwordInput.value.trim();
    if (!word) {
      alert("Please enter a word first.");
      return;
    }

    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Word not found");

      const data = await response.json();
      console.log(data);

      // Extract first definition + example (if exists)
      const definition = data[0].meanings[0].definitions[0].definition;
      const exampleSentence =
        data[0].meanings[0].definitions[0].example ||
        `This is an example sentence using the word "${word}".`;

      // ✅ Pre-fill the textareas
      frontCard.value = exampleSentence;
      backCard.value = definition;

      // ✅ Hide initial input form, show flashcard fields
      cardForm.style.display = "none";
      flashcardFields.style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Could not fetch data for that word. Try another one!");
    }
  });
}
