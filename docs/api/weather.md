# Weather API

Base URL: `http://localhost:3000`

> **Setup:** Get free API key from https://openweathermap.org/api (1000 calls/day free)

---

## Check Status

```bash
curl http://localhost:3000/weather/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Current Weather

```bash
# Default city (Delhi)
curl http://localhost:3000/weather/current \
  -H "Authorization: Bearer YOUR_TOKEN"

# Specific city
curl "http://localhost:3000/weather/current?city=Mumbai&country=IN" \
  -H "Authorization: Bearer YOUR_TOKEN"

# International city
curl "http://localhost:3000/weather/current?city=London&country=UK" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "weather": {
    "city": "Delhi",
    "country": "IN",
    "description": "clear sky",
    "icon": "☀️",
    "temperature": 25,
    "feelsLike": 27,
    "humidity": 45,
    "windSpeed": 12,
    "sunrise": "2025-12-07T06:30:00.000Z",
    "sunset": "2025-12-07T17:30:00.000Z"
  }
}
```

---

## Get Weather by Coordinates

```bash
curl "http://localhost:3000/weather/coords?lat=28.6139&lon=77.2090" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get 5-Day Forecast

```bash
# Default city
curl http://localhost:3000/weather/forecast \
  -H "Authorization: Bearer YOUR_TOKEN"

# Specific city
curl "http://localhost:3000/weather/forecast?city=Bangalore" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Get Daily Forecast

```bash
curl http://localhost:3000/weather/daily \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "days": 5,
  "forecast": [
    {
      "date": "2025-12-07",
      "tempMin": 15,
      "tempMax": 28,
      "description": "clear sky",
      "icon": "☀️",
      "humidity": 40,
      "pop": 0
    }
  ]
}
```

---

## Get Weather Summary

```bash
curl http://localhost:3000/weather/summary \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "summary": "☀️ Delhi: 25°C (feels like 27°C) - clear sky. Humidity: 45%, Wind: 12 km/h"
}
```

---

## Get Brief Weather (for Daily Briefing)

```bash
curl http://localhost:3000/weather/brief \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "ok": true,
  "city": "Delhi",
  "current": "☀️ 25°C, clear sky",
  "today": "High: 28°C, Low: 15°C, 0% chance of rain"
}
```

