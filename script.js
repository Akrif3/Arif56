fetch("/.netlify/functions/fixtures")
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка загрузки матчей");
        }

        return response.json();
    })
    .then(data => {
        const matchesContainer = document.getElementById("matches");

        if (!matchesContainer) {
            console.error("Не найден элемент #matches");
            return;
        }

        matchesContainer.innerHTML = "";

        if (!data.response || data.response.length === 0) {
            matchesContainer.innerHTML = "<p>Матчи не найдены.</p>";
            return;
        }

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

            const homeTeam = match.teams.home;
            const awayTeam = match.teams.away;

            const homeScore =
                match.goals.home !== null ? match.goals.home : "-";

            const awayScore =
                match.goals.away !== null ? match.goals.away : "-";

            const status = match.fixture.status.short;

            let statusText = time;

            if (status === "FT") {
                statusText = "Завершён";
            } else if (status === "LIVE" || status === "1H" || status === "2H") {
                statusText = "LIVE";
            } else if (status === "NS") {
                statusText = time;
            }

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `
                <div class="match-date">
                    ${day}
                </div>

                <div class="team home-team">
                    <span>${homeTeam.name}</span>
                    <img src="${homeTeam.logo}" alt="${homeTeam.name}">
                </div>

                <div class="match-score">
                    <div class="score">
                        ${homeScore} : ${awayScore}
                    </div>

                    <div class="match-status">
                        ${statusText}
                    </div>
                </div>

                <div class="team away-team">
                    <img src="${awayTeam.logo}" alt="${awayTeam.name}">
                    <span>${awayTeam.name}</span>
                </div>
            `;

            matchesContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);

        const matchesContainer = document.getElementById("matches");

        if (matchesContainer) {
            matchesContainer.innerHTML =
                "<p>Не удалось загрузить матчи.</p>";
        }
    });
