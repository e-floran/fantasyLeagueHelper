import offSeason2024 from "../assets/teams/offSeason2024.json";

export const cleanRosters = () => {
  const { teams } = offSeason2024;
  const cleanedTeams = teams.map((team) => {
    const {
      roster: { entries },
    } = team;
    const newRoster = entries.map((singlePlayer) => {
      const nestedPlayer = { ...singlePlayer.playerPoolEntry.player };
      const nestedPool = { ...singlePlayer.playerPoolEntry };
      const copiedExtPlayer = { ...singlePlayer };
      delete nestedPool.player;
      delete copiedExtPlayer.playerPoolEntry;
      return { ...nestedPlayer, ...nestedPool, ...copiedExtPlayer };
    });
    return { ...team, roster: newRoster };
  });

  fs.readFile("myjsonfile.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      obj.table.push({ id: 2, square: 3 }); //add some data
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile("myjsonfile.json", json, "utf8", callback); // write it back
    }
  });
};
