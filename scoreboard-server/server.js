// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

// Game simulation data
// Replace `let gameData = {}` with this:
let games = [
  {
    id: 1,
    homeTeam: {
      city: "Los Angeles", name: "Lakers", abbreviation: "LAL", wins: 51, losses: 31, score: 52,
      stats: { fgPercentage: "36.2%", threePointMade: 4, threePointAttempts: 28, rebounds: 35 }
    },
    awayTeam: {
      city: "Boston", name: "Celtics", abbreviation: "BOS", wins: 56, losses: 26, score: 69,
      stats: { fgPercentage: "44.8%", threePointMade: 14, threePointAttempts: 34, rebounds: 32 }
    },
    period: 3,
    timeRemaining: "6:42",
    gameStatus: "live"
  },
  {
    id: 2,
    homeTeam: {
      city: "Miami", name: "Heat", abbreviation: "MIA", wins: 48, losses: 34, score: 60,
      stats: { fgPercentage: "50.1%", threePointMade: 10, threePointAttempts: 25, rebounds: 38 }
    },
    awayTeam: {
      city: "Chicago", name: "Bulls", abbreviation: "CHI", wins: 44, losses: 38, score: 58,
      stats: { fgPercentage: "47.3%", threePointMade: 9, threePointAttempts: 27, rebounds: 35 }
    },
    period: 2,
    timeRemaining: "3:21",
    gameStatus: "live"
  },
  {
    id: 3,
    homeTeam: {
      city: "Golden State", name: "Warriors", abbreviation: "GSW", wins: 50, losses: 32, score: 78,
      stats: { fgPercentage: "54.2%", threePointMade: 18, threePointAttempts: 40, rebounds: 29 }
    },
    awayTeam: {
      city: "New York", name: "Knicks", abbreviation: "NYK", wins: 46, losses: 36, score: 74,
      stats: { fgPercentage: "51.0%", threePointMade: 15, threePointAttempts: 35, rebounds: 30 }
    },
    period: 4,
    timeRemaining: "1:45",
    gameStatus: "live"
  },
  {
    id: 4,
    homeTeam: {
      city: "Phoenix", name: "Suns", abbreviation: "PHX", wins: 49, losses: 33, score: 88,
      stats: { fgPercentage: "48.8%", threePointMade: 12, threePointAttempts: 29, rebounds: 42 }
    },
    awayTeam: {
      city: "Milwaukee", name: "Bucks", abbreviation: "MIL", wins: 53, losses: 29, score: 84,
      stats: { fgPercentage: "47.6%", threePointMade: 11, threePointAttempts: 30, rebounds: 41 }
    },
    period: 4,
    timeRemaining: "0:37",
    gameStatus: "live"
  }
];


function simulateGameProgress(game) {
  if (game.gameStatus !== 'live') return;

  const scoringTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  const pointsScored = Math.floor(Math.random() * 4);

  if (pointsScored > 0) {
    game[scoringTeam].score += pointsScored;

    if (pointsScored === 3) {
      game[scoringTeam].stats.threePointMade += 1;
      game[scoringTeam].stats.threePointAttempts += 1;
    } else if (pointsScored === 2 || pointsScored === 1) {
      const newPercentage = Math.min(Math.max(
        parseFloat(game[scoringTeam].stats.fgPercentage) + (Math.random() * 0.5 - 0.25),
        35.0), 65.0).toFixed(1);
      game[scoringTeam].stats.fgPercentage = newPercentage + "%";
    }
  } else {
    if (Math.random() > 0.7) {
      game[scoringTeam].stats.threePointAttempts += 1;
    }
  }

  const reboundTeam = Math.random() > 0.5 ? 'homeTeam' : 'awayTeam';
  if (Math.random() > 0.7) {
    game[reboundTeam].stats.rebounds += 1;
  }

  const currentMinutes = parseInt(game.timeRemaining.split(':')[0]);
  const currentSeconds = parseInt(game.timeRemaining.split(':')[1]);
  let newSeconds = currentSeconds - Math.floor(Math.random() * 24);
  let newMinutes = currentMinutes;

  if (newSeconds < 0) {
    newMinutes -= 1;
    newSeconds += 60;
  }

  if (newMinutes < 0) {
    game.period += 1;
    if (game.period > 4) {
      if (game.homeTeam.score === game.awayTeam.score) {
        game.timeRemaining = "5:00";
      } else {
        game.gameStatus = "final";
        game.timeRemaining = "0:00";
      }
    } else {
      game.timeRemaining = "12:00";
    }
  } else {
    game.timeRemaining = `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
  }
}

function simulateAllGames() {
  for (const game of games) {
    simulateGameProgress(game); // 👈 pass the game object
  }
}

setInterval(simulateAllGames, 3000);


app.get('/api/game', (req, res) => {
  res.json(games);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
