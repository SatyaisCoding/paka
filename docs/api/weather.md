# Weather API

Base URL: `http://localhost:3000`

> **Provider:** Open-Meteo (ECMWF data) - **FREE, no API key required!**
> 
> Uses the European Centre for Medium-Range Weather Forecasts model - ranked #1 for accuracy globally.

---

## Check Status

```bash
curl http://localhost:3000/weather/status \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "configured": true,
  "provider": "Open-Meteo",
  "message": "Weather API ready! Using Open-Meteo (ECMWF data) - free, no API key required.",
  "features": [
    "Current weather",
    "7-day forecast",
    "Hourly forecast (48 hours)",
    "UV Index",
    "Precipitation probability"
  ]
}
```

---

## Get Current Weather

```bash
# Default city (Delhi)
curl http://localhost:3000/weather/current \
  -H "Authorization: Bearer $TOKEN"

# Specific city
curl "http://localhost:3000/weather/current?city=Mumbai" \
  -H "Authorization: Bearer $TOKEN"

# With country filter
curl "http://localhost:3000/weather/current?city=Delhi&country=IN" \
  -H "Authorization: Bearer $TOKEN"

# International city
curl "http://localhost:3000/weather/current?city=London" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "weather": {
    "city": "Delhi",
    "country": "IN",
    "description": "Mainly clear",
    "icon": "🌤️",
    "temperature": 13,
    "feelsLike": 12,
    "humidity": 82,
    "pressure": 1019,
    "windSpeed": 4,
    "windDirection": 279,
    "clouds": 41,
    "visibility": 10,
    "sunrise": "2025-12-08T07:01",
    "sunset": "2025-12-08T17:24",
    "timezone": "Asia/Kolkata",
    "updatedAt": "2025-12-07T20:33:55.947Z",
    "uvIndex": 3.7,
    "precipitation": 0
  }
}
```

---

## Get Weather by Coordinates

```bash
curl "http://localhost:3000/weather/coords?lat=28.6139&lon=77.2090" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Get 7-Day Daily Forecast

```bash
# Default city
curl http://localhost:3000/weather/daily \
  -H "Authorization: Bearer $TOKEN"

# Specific city
curl "http://localhost:3000/weather/daily?city=Bangalore" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "days": 7,
  "forecast": [
    {
      "date": "2025-12-08",
      "tempMin": 17,
      "tempMax": 26,
      "description": "Overcast",
      "icon": "☁️",
      "humidity": 0,
      "windSpeed": 15,
      "pop": 0,
      "sunrise": "2025-12-08T06:15",
      "sunset": "2025-12-08T17:45",
      "uvIndexMax": 5.2
    },
    {
      "date": "2025-12-09",
      "tempMin": 15,
      "tempMax": 26,
      "description": "Overcast",
      "icon": "☁️",
      "humidity": 0,
      "windSpeed": 12,
      "pop": 0,
      "sunrise": "2025-12-09T06:16",
      "sunset": "2025-12-09T17:45",
      "uvIndexMax": 5.1
    }
  ]
}
```

---

## Get Hourly Forecast (48 hours)

```bash
curl "http://localhost:3000/weather/forecast?city=Mumbai" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "count": 48,
  "forecast": [
    {
      "datetime": "2025-12-08T00:00",
      "temperature": 24,
      "feelsLike": 25,
      "description": "Partly cloudy",
      "icon": "⛅",
      "humidity": 65,
      "windSpeed": 12,
      "pop": 10
    }
  ]
}
```

---

## Get Weather Summary

One-liner summary perfect for notifications or quick display.

```bash
curl "http://localhost:3000/weather/summary?city=Delhi" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "summary": "🌤️ Delhi, IN: 13°C (feels like 12°C) - Mainly clear. Humidity: 82%, Wind: 4 km/h, UV Index: 3.7"
}
```

---

## Get Brief Weather (for Daily Briefing)

Compact format for daily briefing integration.

```bash
curl "http://localhost:3000/weather/brief?city=Bangalore" \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "city": "Bangalore",
  "current": "☁️ 22°C, Overcast",
  "today": "High: 26°C, Low: 17°C, 0% chance of rain"
}
```

---

## Weather Icons

| Icon | Meaning |
|------|---------|
| ☀️ | Clear sky |
| 🌤️ | Mainly clear |
| ⛅ | Partly cloudy |
| ☁️ | Overcast |
| 🌫️ | Fog |
| 🌦️ | Light rain/drizzle |
| 🌧️ | Rain |
| ⛈️ | Thunderstorm |
| 🌨️ | Snow/Freezing rain |
| ❄️ | Heavy snow |

---

## Features

| Feature | Description |
|---------|-------------|
| **No API Key** | Works out of the box - no setup required |
| **ECMWF Data** | Uses the most accurate global weather model |
| **7-Day Forecast** | Daily high/low, precipitation probability |
| **48-Hour Hourly** | Hour-by-hour forecast |
| **UV Index** | Daily maximum UV index |
| **Sunrise/Sunset** | Exact times for your location |
| **Feels Like** | Apparent temperature accounting for humidity/wind |
| **Precipitation** | Current precipitation and probability |

---

## Supported Cities

Any city worldwide! The API uses Open-Meteo's geocoding to find coordinates automatically.

```bash
# Indian cities
curl "http://localhost:3000/weather/current?city=Mumbai"
curl "http://localhost:3000/weather/current?city=Bangalore"
curl "http://localhost:3000/weather/current?city=Chennai"
curl "http://localhost:3000/weather/current?city=Kolkata"

# International
curl "http://localhost:3000/weather/current?city=New%20York"
curl "http://localhost:3000/weather/current?city=London"
curl "http://localhost:3000/weather/current?city=Tokyo"
curl "http://localhost:3000/weather/current?city=Paris"
```
