const API_KEY = "b26cff28817e47c02cfcd8eae57375c1";
const CITY = "Bloemfontein";
const UNITS = "metric";

export async function getCurrentWeather() {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather.");
        }

        const data = await response.json();

        return {
            city: data.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon
        };

    } catch (error) {

        console.error(error);

        return {
            city: "Unavailable",
            temperature: "--",
            description: "Weather unavailable",
            icon: ""
        };

    }

}