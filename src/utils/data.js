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
