export default async () => {
    const response = await fetch(
        "https://v3.football.api-sports.io/fixtures?league=2&season=2025",
        {
            headers: {
                "x-apisports-key": process.env.API_FOOTBALL_KEY
            }
        }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    });
};
