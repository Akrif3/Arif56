fetch("/.netlify/functions/fixtures")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        console.log("API:", data);

        const matchesContainer = document.getElementById("matches");

        if (!matchesContainer) {
            throw new Error("В matches.html нет элемента id=\"matches\"");
        }

        if (!data.response || data.response.length === 0) {
            matchesContainer.innerHTML = "<p>Матчи не найдены.</p>";
            return;
        }

        matchesContainer.innerHTML = "";

        data.response.forEach(match => {
            const date = new Date(match.fixture.date);

            const day = date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });

            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit"
            });

            const home = match.teams.home;
            const away = match.teams.away;

            const homeScore = match.goals.home ?? "-";
            const awayScore = match.goals.away ?? "-";

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `
                <div class="match-date">${day}</div>

                <div class="team home-team">
                    <span>${home.name}</span>
                    <img src="${home.logo}" alt="${home.name}">
                </div>

                <div class="match-score">
                    <strong>${homeScore} : ${awayScore}</strong>
                    <small>${time}</small>
                </div>

                <div class="team away-team">
                    <img src="${away.logo}" alt="${away.name}">
                    <span>${away.name}</span>
                </div>
            `;

            matchesContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);

        const matchesContainer = document.getElementById("matches");

        if (matchesContainer) {
            matchesContainer.innerHTML = `
                <p>Ошибка: ${error.message}</p>
            `;
        }
    });
