import { supabase } from "./supabaseClient";

    export async function fetchMatches() {
        let { data: matches, error } = await supabase
            .from('matches')
            .select('*');
        if (error) console.error("Error fetching matches: ", error);
        return matches;
        console.log(matches);
    }

export async function fetchPlayers() {
    let { data: players, error } = await supabase
        .from('players')
        .select('*');
    if (error) console.error("Error fetching players: ", error);
    return players;
}

export async function fetchMatchesPlayers() {
    let { data: matchesPlayers, error } = await supabase
        .from('matches_players')
        .select('*');
    if (error) console.error("Error fetching matches_players: ", error);
    return matchesPlayers;
}