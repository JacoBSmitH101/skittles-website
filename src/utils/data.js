import { supabase } from "./supabaseClient";

export async function fetchMatches() {
  let { data: matches, error } = await supabase.from("matches").select("*");
  if (error) console.error("Error fetching matches: ", error);
  return matches;
  console.log(matches);
}
export async function getListOfTeams() {
    let { data: matches, error } = await supabase.from("matches").select("opponentName");
    if (error) {
      console.error("Error fetching matches: ", error);
      return null;
    }
  
    let teams = [];
    matches.forEach((match) => {
      if (match.opponentName && !teams.includes(match.opponentName)) {
        teams.push(match.opponentName);
      }
    });
    //sort teams in alphabetical order
    teams.sort((a, b) => a.localeCompare(b));
    
    return teams;
  }
  export async function fetchMatchById(id) {
    let { data: game, error } = await supabase
      .from('matches')
      .select('*')
      .eq('matchID', id)
      .single();
  
    if (error) console.error("Error fetching match: ", error);
    
    return game;
  }

export async function fetchPlayers() {
  let { data: players, error } = await supabase.from("players").select("*");
  if (error) console.error("Error fetching players: ", error);
  return players;
}

export async function fetchMatchesPlayers() {
  let { data: matchesPlayers, error } = await supabase.from("matches_players").select("*");
  if (error) console.error("Error fetching matches_players: ", error);
  return matchesPlayers;
}
export async function fetchAndCacheData() {
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const lastFetch = localStorage.getItem('lastFetch');
  if (lastFetch && now - lastFetch < twelveHours) {
    // Data is fresh, return it
    return JSON.parse(localStorage.getItem('data'));
  } else {
    // Data is stale, fetch new data
    const matches = await fetchMatches();
    const players = await fetchPlayers();
    const matchesPlayers = await fetchMatchesPlayers();
    const data = { matches, players, matchesPlayers };
    
    // Store the new data in localStorage
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('lastFetch', now);
    
    return data;
  }
}
