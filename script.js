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
            throw new Error('Нет элемента id="matches"');
        }

        container.innerHTML = "";

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

            const card = document.createElement("div");

            card.className = "match-card";

            card.innerHTML = `
                <div class="match-date">
                    ${dateText}
                </div>

                <div class="team home">
                    <span>${home.name}</span>
                    <img src="${home.logo}" alt="${home.name}">
                </div>

                <div class="score">
                    <strong>${homeScore} : ${awayScore}</strong>
                    <small>${timeText}</small>
                </div>

                <div class="team away">
                    <img src="${away.logo}" alt="${away.name}">
                    <span>${away.name}</span>
                </div>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);

        document.getElementById("matches").innerHTML =
            `<p>Ошибка: ${error.message}</p>`;
    });
