const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Route for getting input for grid size and win streak
app.get('/', (req, res) => {
  res.render('index'); // Renders index.ejs
});

// Route for starting the game with n x n grid and m win streak
app.post('/startgame', (req, res) => {
  const { gridSize, winStreak } = req.body;
  res.render('start', { gridSize: parseInt(gridSize), winStreak: parseInt(winStreak) });
});










const port = 3000;
app.listen(port, () => {
  console.log('Tic-tac-toe running on port 3000');
});
