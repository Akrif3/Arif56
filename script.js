fetch("/.netlify/functions/fixtures")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const matchesContainer = document.getElementById("matches");

        if (!matchesContainer) {
            console.error("Элемент #matches не найден");
            return;
        }

        if (!data.response || data.response.length === 0) {
            matchesContainer.innerHTML = "<p>Матчи не найдены.</p>";
            return;
        }

        data.response.forEach(match => {
            const matchElement = document.createElement("div");

            matchElement.innerHTML = `
                <div>
                    <strong>${match.teams.home.name}</strong>
                    vs
                    <strong>${match.teams.away.name}</strong>
                </div>
                <div>
                    ${match.fixture.date}
                </div>
            `;

            matchesContainer.appendChild(matchElement);
        });
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
