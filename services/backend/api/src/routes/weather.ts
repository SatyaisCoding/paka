// src/routes/weather.ts
import { Hono } from 'hono';
import { authMiddleware, getUserId } from '../middleware/auth.js';
import {
  isWeatherConfigured,
  getCurrentWeather,
  getWeatherByCoords,
  getForecast,
  getDailyForecast,
  getWeatherSummary,
  getBriefWeather,
  getIconUrl,
} from '../services/weather.service.js';

const weather = new Hono();

// ============ STATUS ============

// GET /weather/status - Check if Weather API is configured
weather.get('/status', authMiddleware, (c) => {
  return c.json({
    ok: true,
    configured: true,
    provider: 'Open-Meteo',
    message: 'Weather API ready! Using Open-Meteo (ECMWF data) - free, no API key required.',
    features: [
      'Current weather',
      '7-day forecast',
      'Hourly forecast (48 hours)',
      'UV Index',
      'Precipitation probability',
    ],
  });
});

// ============ CURRENT WEATHER ============

// GET /weather/current - Get current weather
weather.get('/current', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const city = c.req.query('city');
    const country = c.req.query('country');
    
    const weather = await getCurrentWeather(city, country);

    return c.json({
      ok: true,
      weather,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /weather/coords - Get weather by coordinates
weather.get('/coords', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const lat = parseFloat(c.req.query('lat') || '0');
    const lon = parseFloat(c.req.query('lon') || '0');

    if (!lat || !lon) {
      return c.json({ ok: false, error: 'lat and lon query parameters required' }, 400);
    }

    const weatherData = await getWeatherByCoords(lat, lon);

    return c.json({
      ok: true,
      weather: weatherData,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ FORECAST ============

// GET /weather/forecast - Get 5-day/3-hour forecast
weather.get('/forecast', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const city = c.req.query('city');
    const country = c.req.query('country');

    const forecast = await getForecast(city, country);

    return c.json({
      ok: true,
      count: forecast.length,
      forecast,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /weather/daily - Get daily forecast (aggregated)
weather.get('/daily', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const city = c.req.query('city');
    const country = c.req.query('country');

    const daily = await getDailyForecast(city, country);

    return c.json({
      ok: true,
      days: daily.length,
      forecast: daily,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// ============ SUMMARIES ============

// GET /weather/summary - Get weather summary text
weather.get('/summary', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const city = c.req.query('city');
    const country = c.req.query('country');

    const summary = await getWeatherSummary(city, country);

    return c.json({
      ok: true,
      summary,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

// GET /weather/brief - Get brief weather for daily briefing
weather.get('/brief', authMiddleware, async (c) => {
  try {
    if (!isWeatherConfigured()) {
      return c.json({ ok: false, error: 'Weather API not configured' }, 400);
    }

    const city = c.req.query('city');
    const country = c.req.query('country');

    const brief = await getBriefWeather(city, country);

    return c.json({
      ok: true,
      city: city || 'Delhi',
      ...brief,
    });
  } catch (err: any) {
    return c.json({ ok: false, error: err.message }, 500);
  }
});

export default weather;

