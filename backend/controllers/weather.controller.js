import {
    getCurrentWeatherService
} from "../services/weather.service.js";

export async function getCurrentWeather(req, res) {
    try {
        const weather = await getCurrentWeatherService(
            req.query.city
        );

        return res.status(200).json({
            success: true,
            weather
        });
    } catch (error) {
        console.error("Get weather error:", error);

        return res.status(502).json({
            success: false,
            message: "Weather information is unavailable."
        });
    }
}