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
            throw new Error('Нет <div id="matches">');
        }

        container.innerHTML = "";

        data.response.forEach(match => {
            const date = new Date(match.fixture.date);

            const card = document.createElement("div");

            card.innerHTML = `
                <div>
                    <img src="${match.teams.home.logo}" width="40">
                    <b>${match.teams.home.name}</b>

                    <strong>
                        ${match.goals.home ?? "-"} : ${match.goals.away ?? "-"}
                    </strong>

                    <b>${match.teams.away.name}</b>
                    <img src="${match.teams.away.logo}" width="40">
                </div>

                <p>
                    ${date.toLocaleDateString("ru-RU")}
                    ${date.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
            `;

            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error(error);

        document.getElementById("matches").innerHTML =
            `<p>Ошибка: ${error.message}</p>`;
    });
