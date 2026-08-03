export async function getCurrentWeatherService(city) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENWEATHER_API_KEY is not configured.");
    }

    const selectedCity =
        city?.trim() ||
        process.env.WEATHER_CITY ||
        "Bloemfontein";

    const params = new URLSearchParams({
        q: selectedCity,
        units: "metric",
        appid: apiKey
    });

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${params}`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch weather.");
    }

    const data = await response.json();

    return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
    };
}