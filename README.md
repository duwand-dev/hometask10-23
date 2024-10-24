# This is Jack's HomeTask for 10/23

## This is a 2-player game of Connect Four with TypeScript and React..

This will help you spending you mean time enjoyable. Having `Fun`!

## Techstacks

`React`, `TailwindCss`, `Babel`, `Typescript`

## Requirements

1. **The current project structure is unorganized. Clean / refine the project structure before getting started.**
2. **The board should be 7 wide by 6 high**
3. **It should alternate between the 'red' and 'yellow' players turn**
4. **Clicking the "Drop" button should drop a token of the current player's to the bottom-most free position**
5. **Clicking the "Drop" button on a full column should have no effect**
6. **If either player gets four in a row (horizontally, vertically, or diagonally)**
   1. The "COLOR's turn" heading should be replaced by "COLOR won!"
   2. The "Drop" buttons should be replaced by a "Play again" button
7. **If the board is full and there is no winner**
   1. The "COLOR's turn" heading should be replaced by "Draw!"
   2. The "Drop" buttons should be replaced by a "Play again" button

## Challenges

1. **Replace the 'Drop' button with a representation of the current player's token, e.g. if it's red's turn, show a semi-transparent red token above each column.**
2. **Keep track of and display how many times each player has won. Save it so the score is tracked even when reloading the page.**
3. **Try to implement the `checkForWinner` function yourself: it should check for four tokens in a row in the horizontal, vertical, and diagonal directions.**

## How to use?

To run this app, you can use `npm install` command to install all required node modules.
Then, you have to use `npm run start` command to run the app. That's it!

You can just click the drop buttons to play!!! Hints will help you easy to place your tokens.
If one player wins, it'll inform you!
The winner's information is store on the browser.
