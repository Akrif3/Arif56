fetch("/.netlify/functions/fixtures")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        const container = document.getElementById("matches");

        if (!container) {
            throw new Error('Не найден элемент <div id="matches"></div>');
        }

        container.innerHTML = "";

        if (!data.response || data.response.length === 0) {
            container.innerHTML = `
                <p>Матчи не найдены.</p>
            `;
            return;
        }

        data.response.forEach(match => {
            const date = new Date(match.fixture.date);

            const dateText = date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });

            const timeText = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit"
            });

            const home = match.teams.home;
            const away = match.teams.away;

            const homeScore = match.goals.home ?? "-";
            const awayScore = match.goals.away ?? "-";

            const status = match.fixture.status.short;

            let statusText = timeText;

            if (status === "FT") {
                statusText = "Завершён";
            } else if (
                status === "LIVE" ||
                status === "1H" ||
                status === "2H"
            ) {
                statusText = "LIVE";
            }

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `
                <div class="match-date">
                    ${dateText}
                </div>

                <div class="team home-team">
                    <span>${home.name}</span>
                    <img
                        src="${home.logo}"
                        alt="${home.name}"
                    >
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
                    <img
                        src="${away.logo}"
                        alt="${away.name}"
                    >

                    <span>${away.name}</span>
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Ошибка загрузки матчей:", error);

        const container = document.getElementById("matches");

        if (container) {
            container.innerHTML = `
                <p>Ошибка: ${error.message}</p>
            `;
        }
    });
