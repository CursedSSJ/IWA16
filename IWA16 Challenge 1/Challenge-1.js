const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: "2022-11-18T20:00:00.000Z",
            time: [9, 7, 8, 6],
          },
          {
            date: "2022-12-02T20:00:00.000Z",
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: "2022-11-18T20:00:00.000Z",
            time: [10, 8, 3, 12],
          },
          {
            date: "2022-11-25T20:00:00.000Z",
            time: [6, 8, 9, 11],
          },
          {
            date: "2022-12-02T20:00:00.000Z",
            time: [10, 11, 4, 8],
          },
          {
            date: "2022-12-09T20:00:00.000Z",
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

const createHtml = (athleteID) => {
  const athletesData = {
    NM372: {
      firstName: data.response.data.NM372.firstName,
      surName: data.response.data.NM372.surname,
      id: data.response.data.NM372.id,
      races: data.response.data.NM372.races,
    },
    SV782: {
      firstName: data.response.data.SV782.firstName,
      surName: data.response.data.SV782.surname,
      id: data.response.data.SV782.id,
      races: data.response.data.SV782.races,
    },
  };

  const athletes = athletesData[athleteID];

  const fragment = document.createDocumentFragment();

  let title = document.createElement("h2");
  title.className = "my-div";
  title.textContent = athletes.id;
  fragment.appendChild(title);

  const list = document.createElement("dl");

  const racesData = athletes.races;

  for (let i = 0; i < racesData.length; i++) {
    let date = racesData[i].date;
    date = new Date(date);
    const time = racesData[i].time;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const first = parseInt(time[0]);
    const second = parseInt(time[1]);
    const third = parseInt(time[2]);
    const fourth = parseInt(time[3]);
    const total = first + second + third + fourth;

    const hours = Math.floor(total / 60);
    const minutes = total % 60;

    const firstName = athletes.firstName;
    const surName = athletes.surName;
    const races = athletes.races.length;

    list.innerHTML = `
        <dt>Athlete</dt>
        <dd>${firstName} ${surName}</dd>
        <dt>Total Races</dt>
        <dd>${races}</dd>
        <dt>Event Date (Latest)</dt>
        <dd>${day} ${month} ${year}</dd>
        <dt>Total Time (Latest)</dt>
        <dd>${hours.toString().padStart(2, "0")}:${minutes}</dd>
    `;
    fragment.appendChild(list);

    document.body.appendChild(fragment);
  }
};

const athlete1 = document.querySelector("[data-athlete='NM372']");
const athlete2 = document.querySelector("[data-athlete='SV782']");

createHtml(athlete1.getAttribute("data-athlete") || null);
createHtml(athlete2.getAttribute("data-athlete") || null);
