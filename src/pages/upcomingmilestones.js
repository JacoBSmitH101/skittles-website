import React, { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import { DashboardLayout } from "../components/dashboard-layout";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import UserNotAuth from "../components/user-not-auth";
import { Box, Container } from "@mui/system";
function UpcomingMilestones() {
  const [allPlayers, setAllPlayers] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState(null);
  const [milestones, setMilestones] = useState({
    playerGames: null,
    playerPins: null,
    teamGames: null,
    teamPins: null,
  });

  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://skittles-server.herokuapp.com/players")
      .then((res) => res.json())
      .then((data) => {
        setAllPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      });
    auth.getCurrentUser().then((res) => {
      if (!res) {
        setAuthenticated(false);
        return;
      }
      let id = res.subId.slice(0, -3);
      fetch("https://skittles-server.herokuapp.com/verified-users-list")
        .then((res) => res.json())
        .then((data) => {
          let verified = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].authId === id) {
              verified = true;
              setAuthenticated(true);
              break;
            }
          }
        });
      fetch("https://skittles-server.herokuapp.com/team/Jolly Crew")
        .then((res) => res.json())
        .then((data) => {
          setTeamData(data);
        });
    });
  }, []);
  useEffect(() => {
    //foreach player add up total number of games that didPlay = true and see if next game will either be 50, 75 100, 125, 150, 175, 200 etc..
    //if so, add to upcoming milestones
    //if not, do nothing
    //if no games played, do nothing

    if (allPlayers != null) {
      let upcomingMilestone = {};

      Object.keys(allPlayers).forEach((player) => {
        let upcomingMilestones = [];
        let totalGames = 0;
        //push [upcomingmilestone, gamesTillMilestone]
        Object.keys(allPlayers[player].seasons).forEach((season) => {
          totalGames += allPlayers[player].seasons[season].gamesPlayed;
        });
        upcomingMilestones.push([player, 50, 50 - totalGames]);
        upcomingMilestones.push([player, 75, 75 - totalGames]);
        upcomingMilestones.push([player, 100, 100 - totalGames]);
        upcomingMilestones.push([player, 125, 125 - totalGames]);
        upcomingMilestones.push([player, 150, 150 - totalGames]);
        upcomingMilestones.push([player, 175, 175 - totalGames]);
        upcomingMilestones.push([player, 200, 200 - totalGames]);
        upcomingMilestones.push([player, 225, 225 - totalGames]);
        upcomingMilestones.push([player, 250, 250 - totalGames]);
        upcomingMilestones.push([player, 275, 275 - totalGames]);
        upcomingMilestones.push([player, 300, 300 - totalGames]);
        upcomingMilestones.push([player, 325, 325 - totalGames]);

        //remove any milestones that are not happening next game
        upcomingMilestones = upcomingMilestones.filter((milestone) => {
          return milestone[1] === 1;
        });
        if (upcomingMilestones.length == 0) {
          upcomingMilestones.push("NONE", totalGames);
        }
        upcomingMilestone[player] = upcomingMilestones;
      });
      setMilestones({ ...milestones, playerGames: upcomingMilestone });
    }
    //add up all players total pins in each season and see if next game will be 500(n)
    //if so, add to upcoming milestones
    //if not, do nothing
    if (allPlayers !== null) {
      let upcomingMilestone = {};

      Object.keys(allPlayers).forEach((player) => {
        let totalPins = 0;
        let upcomingMilestones = [];
        //push [upcomingmilestone, pinsTillMilestone]
        Object.keys(allPlayers[player].seasons).forEach((season) => {
          totalPins += allPlayers[player].seasons[season].seasonTotal;
        });
        for (let i = 0; i < 25; i++) {
          upcomingMilestones.push([500 * (i + 1), 500 * (i + 1) - totalPins]);
        }
        //remove any milestones that are not happening next game
        upcomingMilestones = upcomingMilestones.filter((milestone) => {
          return milestone[1] <= 100 && milestone[1] > 0;
        });
        if (upcomingMilestones.length == 0) {
          upcomingMilestones.push("NONE", totalPins);
        }
        upcomingMilestone[player] = upcomingMilestones;
        console.log(upcomingMilestone);
        setMilestones({ ...milestones, playerPins: upcomingMilestone });
      });
    }
    //add up all pins the team has in each season and see if next game will be 1000(n)
    //if so, add to upcoming milestones
    //if not, do nothing
    if (allPlayers !== null) {
      let totalTeamPins = 0;
      let upcomingMilestones = [];
      //push [upcomingmilestone, pinsTillMilestone]
      Object.keys(allPlayers).forEach((player) => {
        Object.keys(allPlayers[player].seasons).forEach((season) => {
          totalTeamPins += allPlayers[player].seasons[season].seasonTotal;
        });
      });
      for (let i = 0; i < 500; i++) {
        upcomingMilestones.push([5000 * (i + 1), 5000 * (i + 1) - totalTeamPins]);
      }
      //remove any milestones that are not happening next game
      upcomingMilestones = upcomingMilestones.filter((milestone) => {
        return milestone[1] <= 750 && milestone[1] > 0;
      });
      if (upcomingMilestones.length == 0) {
        upcomingMilestones.push("NONE", totalTeamPins);
      }
      setMilestones({ ...milestones, teamPins: upcomingMilestones });
    }

    //get total team games that .didPlay
    //if next game will be 50, 75, 100, 125, 150, 175, 200 etc.. add to upcoming milestones
    //if not, do nothing
    if (teamData != null) {
      let totalTeamGames = 0;
      let upcomingMilestones = [];
      //push [upcomingmilestone, gamesTillMilestone]
      Object.keys(teamData.seasons).forEach((season) => {
        Object.keys(teamData.seasons[season].games).forEach((game) => {
          if (teamData.seasons[season].games[game].didPlay) {
            totalTeamGames++;
          }
        });
      });
      for (let i = 0; i < 25; i++) {
        upcomingMilestones.push([25 * (i + 1), 25 * (i + 1) - totalTeamGames]);
      }
      //remove any milestones that are not happening next game
      upcomingMilestones = upcomingMilestones.filter((milestone) => {
        return milestone[1] === 1;
      });
      if (upcomingMilestones.length == 0) {
        upcomingMilestones = ["NONE", totalTeamGames];
      }
      setMilestones({ ...milestones, teamGames: upcomingMilestones });
    }
  }, [allPlayers, teamData]);
  if (!isAuthenticated) {
    return <UserNotAuth />;
  }
  if (isLoading)
    return (
      <Card>
        <p>No data</p>
      </Card>
    );
  if (!allPlayers || !filteredPlayers)
    return (
      <Card>
        <p>No profile data</p>
      </Card>
    );
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          paddingTop: "2%",
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} md={12} xl={12}xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h2" component="h2">
                    Upcoming Milestones
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={4.5} lg={3.5} md={4} sm={4} xs={12}></Grid>
            <Grid item xl={4.5} lg={3.5} md={4} sm={4} xs={12}></Grid>
            <Grid item xl={6} lg={8} sm={12} xs={12}></Grid>

            <Grid item xl={6} lg={4} sm={12} xs={12}></Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
            <Grid item xl={3} lg={4} sm={6} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
UpcomingMilestones.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default UpcomingMilestones;
