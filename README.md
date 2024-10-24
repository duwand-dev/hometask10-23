# This is Jack's HomeTask for 10/23

## This is a 2-player game of Connect Four with TypeScript and React..

This will help you spending you mean time enjoyable. Having `Fun`!

## Techstacks

`React`, `TailwindCss`, `Babel`, `Typescript`

## Requirements

1. **The board should be 7 wide by 6 high**
2. **It should alternate between the 'red' and 'yellow' players turn**
3. **Clicking the "Drop" button should drop a token of the current player's to the bottom-most free position**
4. **Clicking the "Drop" button on a full column should have no effect**
5. **If either player gets four in a row (horizontally, vertically, or diagonally)**
   1. The "COLOR's turn" heading should be replaced by "COLOR won!"
   2. The "Drop" buttons should be replaced by a "Play again" button
6. **If the board is full and there is no winner**
   1. The "COLOR's turn" heading should be replaced by "Draw!"
   2. The "Drop" buttons should be replaced by a "Play again" button

## Challenge

**Replace the 'Drop' button with a representation of the current player's token, e.g. if it's red's turn, show a semi-transparent red token above each column.**

So, I checked if there are any tokens in columns and showed those semi-transparent tokens. All the information is stored inside two-dimensional array so I had to check the array called BoardData. Checking each column and placing semi-transparent tokens were challenging. I solved it!

## How to use?

To run this app, you can use `npm install` command to install all required node modules.
Then, you have to use `npm run start` command to run the app. That's it!
