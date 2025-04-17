import React from 'react';
import './GameCard.css';

function GameCard({ game }) {
  const { homeTeam, awayTeam, period, timeRemaining, gameStatus } = game;

  const getStatusDisplay = () => {
    if (gameStatus === 'final') return 'Final';
    if (gameStatus === 'live') {
      if (period <= 4) {
        return `Q${period} - ${timeRemaining}`;
      } else {
        return `OT${period - 4} - ${timeRemaining}`;
      }
    }
    return gameStatus.charAt(0).toUpperCase() + gameStatus.slice(1);
  };

  return (
    <div className="game-card">
      <div className="game-status">
        <span>{getStatusDisplay()}</span>
      </div>

      <div className="team-container">
        <div className="team away">
          <div className="team-info">
            <div className={`team-logo ${awayTeam.abbreviation.toLowerCase()}`}>
              {awayTeam.abbreviation}
            </div>
            <div className="team-name">
              <span className="team-city">{awayTeam.city}</span>
              <span className="team-nickname">{awayTeam.name}</span>
            </div>
            <div className="team-record">
              ({awayTeam.wins}-{awayTeam.losses})
            </div>
          </div>
          <div className="team-score">{awayTeam.score}</div>
        </div>

        <div className="team home">
          <div className="team-info">
            <div className={`team-logo ${homeTeam.abbreviation.toLowerCase()}`}>
              {homeTeam.abbreviation}
            </div>
            <div className="team-name">
              <span className="team-city">{homeTeam.city}</span>
              <span className="team-nickname">{homeTeam.name}</span>
            </div>
            <div className="team-record">
              ({homeTeam.wins}-{homeTeam.losses})
            </div>
          </div>
          <div className="team-score">{homeTeam.score}</div>
        </div>
      </div>

      {game.gameStatus === 'live' && (
        <div className="game-stats">
          <div className="stat-row">
            <div className="stat-label">FG%</div>
            <div className="stat-value">{awayTeam.stats.fgPercentage}</div>
            <div className="stat-value">{homeTeam.stats.fgPercentage}</div>
          </div>
          <div className="stat-row">
            <div className="stat-label">3PT</div>
            <div className="stat-value">
              {awayTeam.stats.threePointMade}-{awayTeam.stats.threePointAttempts}
            </div>
            <div className="stat-value">
              {homeTeam.stats.threePointMade}-{homeTeam.stats.threePointAttempts}
            </div>
          </div>
          <div className="stat-row">
            <div className="stat-label">REB</div>
            <div className="stat-value">{awayTeam.stats.rebounds}</div>
            <div className="stat-value">{homeTeam.stats.rebounds}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameCard;
