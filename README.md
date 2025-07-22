# SDI31-Project-1

## Project 1 - English Flashcard review

Author: Dustin
Program: Supra Coders SDI-31

This is a simple Flashcard Review Web Application that helps users create and review custom flashcards using definitions from an online dictionary API. It stores cards in the browser's localStorage, so your deck persists between sessions.

## DOWNLOAD & SETUP INSTRUCTIONS:

Option 1: Clone the git repository

- git clone https://github.com/OverKoffee/SDI31-Project-1.git
- cd SDI31-Project-1

Option 2: Download ZIP

- Go to Project 1 Repository (https://github.com/OverKoffee/SDI31-Project-1.git)
- Click the green <> Code button
- Select Download ZIP
- Extract the ZIP file

## RUNNING THE APPLICATION:

- Simply open index.html in your browser

## HOW TO USE:

Add Flashcards

- From the homepage (index.html), click "Add New Card"
- Enter a word you want to learn and click "Fetch"
- If the word exists in the Dictionary API, it will auto-fill a sentence (front) and definition (back)
- You can edit the front/back fields manually if needed, then save the card

Review Flashcards

- Go back to the homepage and click "Start Reviewing"
- You'll see a sentence (front) with the word hidden in context
- Think about the meaning → click "Show Answer" to reveal the back side
- If you understood it, click "Mark Learned" (removes it from the stack)
- If not, click "Next Card" to revisit it later
- Repeat Until All Cards Learned

When your deck is complete, you'll see a Congrats! screen

## CURRENT FEATURES

Current Features

- Add new flashcards manually or via Dictionary API
- Save cards persistently using localStorage
- Review cards in a cycle until they're all marked Learned
- Skip cards you're unsure about (they'll stay in the stack)

TO-DO (time allowing):

Add leaderboard ranking;
allow user to put username for new flashcard session,
otherwise load existing flashcards for the existing user,
include username property to attribute each card to a user
