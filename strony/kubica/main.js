const fetchKubicaProfile = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/drivers/kubica.json');
      const data = await response.json();
      const driver = data.MRData.DriverTable.Drivers[0];
      
      document.getElementById('driver-info').innerText = `
        Imie i Nazwisko: ${driver.givenName} ${driver.familyName}
        Narodowość: ${driver.nationality}
        Data urodzenia: ${driver.dateOfBirth}
      `;
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchKubicaTeamsAndCars = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/drivers/kubica/results.json?limit=1000');
      const data = await response.json();
      const results = data.MRData.RaceTable.Races;

      const cars = {};
      results.forEach(race => {
        const season = race.season;
        const team = race.Results[0].Constructor.name;
        const car = race.Results[0].Constructor.constructorId;

        if (!cars[season]) {
          cars[season] = { team, car };
        }
      });

      const tableBody = document.getElementById('teams-table-body');
      for (const season in cars) {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = season;
        row.insertCell(1).innerText = cars[season].team;
        row.insertCell(2).innerText = cars[season].car;
      }
    } catch (error) {
      console.error('Error fetching teams and cars data:', error);
    }
  };

  const fetchKubicaRaceResults = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/drivers/kubica/results.json?limit=1000');
      const data = await response.json();
      const results = data.MRData.RaceTable.Races;

      const tableBody = document.getElementById('races-table-body');
      results.forEach(race => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = race.season;
        row.insertCell(1).innerText = race.round;
        row.insertCell(2).innerText = race.raceName;
        row.insertCell(3).innerText = race.Results[0].position;
        row.insertCell(4).innerText = race.Results[0].points;
      });
    } catch (error) {
      console.error('Error fetching race results data:', error);
    }
  };

  const fetchKubicaAchievements = async () => {
    try {
      const response = await fetch('https://ergast.com/api/f1/drivers/kubica/driverStandings.json');
      const data = await response.json();
      const standings = data.MRData.StandingsTable.StandingsLists;

      const achievements = standings.map(standing => {
        return `Sezon: ${standing.season}, Pozycja: ${standing.DriverStandings[0].position}, Punkty: ${standing.DriverStandings[0].points}`;
      }).join('\n');

      document.getElementById('achievements-info').innerText = achievements;
    } catch (error) {
      console.error('Error fetching achievements data:', error);
    }
  };

  fetchKubicaProfile();
  fetchKubicaTeamsAndCars();
  fetchKubicaRaceResults();
  fetchKubicaAchievements();