import { fetchMatches, fetchPlayers, fetchMatchesPlayers } from "./data";

/**
 * Fetches all matches, players, and matchesPlayers data.
 * @returns {Promise<Array>} A Promise that resolves to an array containing all matches, players, and matchesPlayers data.
 */
async function fetchData() {
  const matches = await fetchMatches();
  const players = await fetchPlayers();
  const matchesPlayers = await fetchMatchesPlayers();
  return [matches, players, matchesPlayers];
}

/**
 * Returns the season in the format "YYYY-YY" given a year.
 * @param {number} year - The year to get the season for.
 * @returns {string} The season in the format "YYYY-YY".
 */
export function getSeason(year) {
  return `20${Math.floor(year / 10000)}-20${Math.floor((year / 100) % 100)}`;
}

/**
 * Returns an object containing the score and opponent name of the last game played.
 * @param {Array} matches - An array of matches.
 * @returns {Object} An object containing the score and opponent name of the last game played.
 */
export function getLastGameInfo(matches) {
  if (matches.length === 0) {
    // Handle the case when matches is empty, for example:
    return { score: null, opponent: null };
  }
  const lastGame = matches.reduce((prev, curr) => (prev.matchID > curr.matchID ? prev : curr));
  return {
    score: lastGame.score,
    opponentName: lastGame.opponentName,
    opponentScore: lastGame.opponentScore,
    matchID: lastGame.matchID,
  };
}
/**
 * Returns the average score for the latest season.
 * @param {Array} matches - An array of matches.
 * @returns {number} The average score for the latest season.
 */
export function getLatestSeasonAverage(matches) {
  // Get the latest season
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));

  // Filter out the matches from the latest season
  const matchesLatestSeason = matches.filter((match) => getSeason(match.matchID) === latestSeason);

  // Calculate the average score
  const totalScore = matchesLatestSeason.reduce((total, match) => total + match.score, 0);
  const averageScore = totalScore / matchesLatestSeason.length;

  return { average: averageScore };
}
/**
 * Returns the highest team score for the latest season.
 * @param {Array} matches - An array of matches.
 * @returns {Object} The highest team score for the latest season.
 */
export function getHighestTeamScore(matches) {
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));
  const matchesLatestSeason = matches.filter((match) => getSeason(match.matchID) === latestSeason);
  const highestScoreMatch = matchesLatestSeason.reduce(
    (prev, curr) => (prev.score > curr.score ? prev : curr),
    { score: 0 }
  );

  return {
    score: highestScoreMatch.score,
    opponentName: highestScoreMatch.opponentName,
    alley: highestScoreMatch.alley,
    matchID: highestScoreMatch.matchID,
  };
}
/**
 * Returns the lowest team score for the latest season.
 * @param {Array} matches - An array of matches.
 * @returns {Object} The lowest team score for the latest season.
 */
export function getLowestTeamScore(matches) {
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));
  const matchesLatestSeason = matches.filter((match) => getSeason(match.matchID) === latestSeason);
  const lowestScoreMatch = matchesLatestSeason.reduce(
    (prev, curr) => (prev.score < curr.score ? prev : curr),
    { score: Infinity }
  );

  return {
    score: lowestScoreMatch.score,
    opponentName: lowestScoreMatch.opponentName,
    alley: lowestScoreMatch.alley,
    matchID: lowestScoreMatch.matchID,
  };
}

/**
 * Returns all games data.
 * @param {Array} matches - An array of matches.
 * @returns {Array} An array of all games data.
 */
export function getAllGamesData(matches) {
  return matches;
}

/**
 * Returns an array of the last n games played.
 * @param {Array} matches - An array of matches.
 * @param {number} n - The number of games to return.
 * @returns {Array} An array of the last n games played.
 */
export function getLastGamesList(matches, n) {
  return matches
    .sort((a, b) => b.matchID - a.matchID)
    .slice(0, n)
    .map((match) => ({ score: match.score, opponent: match.opponentName, alley: match.alley }));
}

/**
 * Returns the difference in score between the team and the opponent for the latest season.
 * @param {Array} matches - An array of matches.
 * @returns {number} The difference in score between the team and the opponent for the latest season.
 */
export function getSeasonDifference(matches) {
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));
  const matchesLatestSeason = matches.filter((match) => getSeason(match.matchID) === latestSeason);
  return matchesLatestSeason.reduce((sum, match) => sum + match.score - match.opponentScore, 0);
}
/**
 * Returns the highest score for the current season.
 * @param {Array} matches - An array of matches.
 * @returns {Object} An object containing the highest score for the current season.
 */
/**
 * Corrects the hand scores for each match player.
 * @param {Array} matchesPlayers - An array of matchesPlayers.
 * @returns {Array} An array of matchesPlayers with corrected hand scores.
 */
export function correctHandsScore(matchesPlayers) {
  matchesPlayers.forEach((matchPlayer) => {
    let handScoresSum =
      matchPlayer.hand1 +
      matchPlayer.hand2 +
      matchPlayer.hand3 +
      matchPlayer.hand4 +
      matchPlayer.hand5 +
      matchPlayer.hand6;
    if (handScoresSum !== matchPlayer.score) {
      let difference = matchPlayer.score - handScoresSum;
      for (let i = 1; i <= 6; i++) {
        matchPlayer[`hand${i}`] += Math.floor(difference / 6);
      }
      matchPlayer.hand1 += difference % 6;
    }
  });
  return matchesPlayers;
}
/**
 * Returns an array of the top N scores for the latest season.
 * @param {Array} matches - An array of matches.
 * @param {number} topN - The number of top scores to return.
 * @returns {Array} An array of the top N scores for the latest season.
 */
export function getTopScoresThisSeason(matches, matchesPlayers, players, topN) {
  // Get the latest season
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));
  console.log(latestSeason);

  // Filter out the player matches from the latest season
  const playerMatchesLatestSeason = matchesPlayers.filter(
    (matchPlayer) => getSeason(matchPlayer.matchid) === latestSeason
  );
  // Iterate over the player matches and correct the score if necessary
  for (const matchPlayer of playerMatchesLatestSeason) {
    // Calculate the sum of the hand scores
    const handScoreSum =
      matchPlayer.hand1 +
      matchPlayer.hand2 +
      matchPlayer.hand3 +
      matchPlayer.hand4 +
      matchPlayer.hand5;

    // If the hand score sum does not equal the total score, replace the total score with the hand score sum
    if (handScoreSum !== matchPlayer.score) {
      matchPlayer.score = handScoreSum;
    }
  }
  // Sort player matches by score in descending order and take the top N
  const topScores = playerMatchesLatestSeason.sort((a, b) => b.score - a.score).slice(0, topN);

  // Return player matches with top scores
  return topScores.map((matchPlayer) => ({
    score: matchPlayer.score,
    gameNumber: String(matchPlayer.matchid).slice(4, 6),
    playerID: matchPlayer.playerid,
    playerName: players.find((player) => player.playerid === matchPlayer.playerid).name,
  }));
}

/**
 * Returns an array of the top N player averages for the latest season.
 * @param {Array} matches - An array of matches.
 * @param {Array} players - An array of players.
 * @param {number} topN - The number of top averages to return.
 * @returns {Array} An array of the top N player averages for the latest season.
 */
export function getTopAveragesThisSeason(matches, players, topN) {
  // Get the latest season
  const latestSeason = getSeason(Math.max(...matches.map((match) => match.matchID)));

  // Filter out the matches from the latest season
  const matchesLatestSeason = matches.filter((match) => getSeason(match.matchID) === latestSeason);

  // Calculate average for each player and sort in descending order
  const averages = players
    .map((player) => {
      const playerMatches = matchesLatestSeason.filter(
        (match) => match.playerID === player.playerID
      );
      const totalScore = playerMatches.reduce((total, match) => total + match.score, 0);
      const averageScore = totalScore / playerMatches.length;
      return { playerName: player.name, averageScore: averageScore };
    })
    .sort((a, b) => b.averageScore - a.averageScore);

  // Take the top N
  return averages.slice(0, topN);
}
/**
 * Returns an array of the top N players with the highest total pin counts.
 * @param {Array} matchesPlayers - An array of matchesPlayers.
 * @param {Array} players - An array of players.
 * @param {number} topN - The number of top players to return.
 * @returns {Array} An array of the top N players with the highest total pin counts.
 */
export function getTopPinCounts(matchesPlayers, players, topN) {
  // Calculate the total pin count for each player
  const playerPinCounts = players.map((player) => {
    const playerMatches = matchesPlayers.filter(
      (matchPlayer) => matchPlayer.playerid === player.playerid
    );
    const totalPinCount = playerMatches.reduce(
      (total, matchPlayer) =>
        total +
        matchPlayer.hand1 +
        matchPlayer.hand2 +
        matchPlayer.hand3 +
        matchPlayer.hand4 +
        matchPlayer.hand5 +
        matchPlayer.hand6,
      0
    );
    return { playerName: player.name, pinCount: totalPinCount, numberOfGames: playerMatches.length, playerID: player.playerid};
  });
  // Sort players by total pin count in descending order and take the top N
  const topPinCounts = playerPinCounts.sort((a, b) => b.pinCount - a.pinCount).slice(0, topN);

  return topPinCounts;
}
export function getTopAllTimeAverage(matchesPlayers, players, topN) {
  // Calculate the total pin count for each player
  const playerPinCounts = players.map((player) => {
    const playerMatches = matchesPlayers.filter(
      (matchPlayer) => matchPlayer.playerid === player.playerid
    );
    const totalPinCount = playerMatches.reduce(
      (total, matchPlayer) =>
        total +
        matchPlayer.hand1 +
        matchPlayer.hand2 +
        matchPlayer.hand3 +
        matchPlayer.hand4 +
        matchPlayer.hand5 +
        matchPlayer.hand6,
      0
    );
    if (player.playerid == 66) {
      console.log(totalPinCount / playerMatches.length)
    }
    return { playerName: player.name, average: (totalPinCount / playerMatches.length).toPrecision(4), numberOfGames: playerMatches.length, playerID: player.playerid};
  });
  // Sort players by total pin count in descending order and take the top N
  const topPinCounts = playerPinCounts.sort((a, b) => b.average - a.average).slice(0, topN);

  return topPinCounts;
}
