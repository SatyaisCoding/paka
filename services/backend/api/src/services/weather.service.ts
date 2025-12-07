// src/services/weather.service.ts
// Open-Meteo API integration (FREE, no API key required!)
// Uses ECMWF data - one of the most accurate weather models globally

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

// Default location (can be overridden)
const DEFAULT_CITY = process.env.DEFAULT_CITY || 'Delhi';
const DEFAULT_COUNTRY = process.env.DEFAULT_COUNTRY || 'IN';

// ============ INTERFACES ============

export interface GeoLocation {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population?: number;
}

export interface CurrentWeather {
  city: string;
  country: string;
  description: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  clouds: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  timezone: string;
  updatedAt: string;
  uvIndex?: number;
  precipitation: number;
}

export interface WeatherForecast {
  datetime: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

// ============ WEATHER CODE MAPPINGS ============

// WMO Weather interpretation codes (WW)
const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  56: { description: 'Light freezing drizzle', icon: '🌨️' },
  57: { description: 'Dense freezing drizzle', icon: '🌨️' },
  61: { description: 'Slight rain', icon: '🌦️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  66: { description: 'Light freezing rain', icon: '🌨️' },
  67: { description: 'Heavy freezing rain', icon: '🌨️' },
  71: { description: 'Slight snow fall', icon: '🌨️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

function getWeatherInfo(code: number): { description: string; icon: string } {
  return WMO_CODES[code] || { description: 'Unknown', icon: '🌡️' };
}

// ============ HELPER FUNCTIONS ============

/**
 * Open-Meteo is always configured (no API key needed!)
 */
export function isWeatherConfigured(): boolean {
  return true; // Always available!
}

/**
 * Geocode city name to coordinates
 */
async function geocodeCity(city: string, country?: string): Promise<GeoLocation> {
  // Build URL - search by city name only, filter by country if provided
  const params = new URLSearchParams({
    name: city,
    count: '5',
    language: 'en',
    format: 'json',
  });
  
  const url = `${GEOCODING_URL}/search?${params}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error(`City not found: ${city}`);
  }
  
  // If country is specified, try to find a matching result
  let result = data.results[0];
  
  if (country) {
    const countryUpper = country.toUpperCase();
    const countryMatch = data.results.find((r: any) => 
      r.country_code?.toUpperCase() === countryUpper ||
      r.country?.toLowerCase().includes(country.toLowerCase())
    );
    if (countryMatch) {
      result = countryMatch;
    }
  }
  
  return {
    name: result.name,
    country: result.country,
    countryCode: result.country_code?.toUpperCase() || '',
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
    population: result.population,
  };
}

/**
 * Cache for geocoding results
 */
const geoCache = new Map<string, GeoLocation>();

async function getCachedGeocode(city: string, country?: string): Promise<GeoLocation> {
  const key = `${city.toLowerCase()}-${country?.toLowerCase() || ''}`;
  
  if (geoCache.has(key)) {
    return geoCache.get(key)!;
  }
  
  const location = await geocodeCity(city, country);
  geoCache.set(key, location);
  return location;
}

/**
 * Calculate apparent temperature (feels like)
 */
function calculateFeelsLike(temp: number, humidity: number, windSpeed: number): number {
  // Heat index for warm weather
  if (temp >= 27) {
    const hi = -8.78469475556 +
      1.61139411 * temp +
      2.33854883889 * humidity +
      -0.14611605 * temp * humidity +
      -0.012308094 * temp * temp +
      -0.0164248277778 * humidity * humidity +
      0.002211732 * temp * temp * humidity +
      0.00072546 * temp * humidity * humidity +
      -0.000003582 * temp * temp * humidity * humidity;
    return Math.round(hi);
  }
  
  // Wind chill for cold weather
  if (temp <= 10 && windSpeed > 4.8) {
    const wc = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
    return Math.round(wc);
  }
  
  return Math.round(temp);
}

// ============ API FUNCTIONS ============

/**
 * Get current weather by city name
 */
export async function getCurrentWeather(city?: string, country?: string): Promise<CurrentWeather> {
  const location = await getCachedGeocode(city || DEFAULT_CITY, country || DEFAULT_COUNTRY);
  
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m',
    daily: 'sunrise,sunset,uv_index_max',
    timezone: location.timezone,
    forecast_days: '1',
  });
  
  const response = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const current = data.current;
  const daily = data.daily;
  
  const weatherInfo = getWeatherInfo(current.weather_code);
  
  return {
    city: location.name,
    country: location.countryCode,
    description: weatherInfo.description,
    icon: weatherInfo.icon,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.pressure_msl),
    windSpeed: Math.round(current.wind_speed_10m),
    windDirection: current.wind_direction_10m,
    clouds: current.cloud_cover,
    visibility: 10, // Open-Meteo doesn't provide visibility in free tier
    sunrise: daily.sunrise[0],
    sunset: daily.sunset[0],
    timezone: location.timezone,
    updatedAt: new Date().toISOString(),
    uvIndex: daily.uv_index_max?.[0],
    precipitation: current.precipitation,
  };
}

/**
 * Get current weather by coordinates
 */
export async function getWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m',
    daily: 'sunrise,sunset,uv_index_max',
    timezone: 'auto',
    forecast_days: '1',
  });
  
  const response = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const current = data.current;
  const daily = data.daily;
  
  const weatherInfo = getWeatherInfo(current.weather_code);
  
  // Reverse geocode to get city name
  const geoResponse = await fetch(`${GEOCODING_URL}/reverse?latitude=${lat}&longitude=${lon}&language=en&format=json`);
  let cityName = 'Unknown';
  let countryCode = '';
  
  if (geoResponse.ok) {
    const geoData = await geoResponse.json();
    if (geoData.results?.[0]) {
      cityName = geoData.results[0].name;
      countryCode = geoData.results[0].country_code?.toUpperCase() || '';
    }
  }
  
  return {
    city: cityName,
    country: countryCode,
    description: weatherInfo.description,
    icon: weatherInfo.icon,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    pressure: Math.round(current.pressure_msl),
    windSpeed: Math.round(current.wind_speed_10m),
    windDirection: current.wind_direction_10m,
    clouds: current.cloud_cover,
    visibility: 10,
    sunrise: daily.sunrise[0],
    sunset: daily.sunset[0],
    timezone: data.timezone,
    updatedAt: new Date().toISOString(),
    uvIndex: daily.uv_index_max?.[0],
    precipitation: current.precipitation,
  };
}

/**
 * Get hourly forecast (next 48 hours)
 */
export async function getForecast(city?: string, country?: string): Promise<WeatherForecast[]> {
  const location = await getCachedGeocode(city || DEFAULT_CITY, country || DEFAULT_COUNTRY);
  
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    hourly: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m',
    timezone: location.timezone,
    forecast_days: '3',
  });
  
  const response = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const hourly = data.hourly;
  
  const forecasts: WeatherForecast[] = [];
  
  for (let i = 0; i < Math.min(hourly.time.length, 48); i++) {
    const weatherInfo = getWeatherInfo(hourly.weather_code[i]);
    
    forecasts.push({
      datetime: hourly.time[i],
      temperature: Math.round(hourly.temperature_2m[i]),
      feelsLike: Math.round(hourly.apparent_temperature[i]),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: hourly.relative_humidity_2m[i],
      windSpeed: Math.round(hourly.wind_speed_10m[i]),
      pop: hourly.precipitation_probability[i] || 0,
    });
  }
  
  return forecasts;
}

/**
 * Get daily forecast (next 7 days)
 */
export async function getDailyForecast(city?: string, country?: string): Promise<DailyForecast[]> {
  const location = await getCachedGeocode(city || DEFAULT_CITY, country || DEFAULT_COUNTRY);
  
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max,uv_index_max',
    timezone: location.timezone,
    forecast_days: '7',
  });
  
  const response = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const daily = data.daily;
  
  const forecasts: DailyForecast[] = [];
  
  for (let i = 0; i < daily.time.length; i++) {
    const weatherInfo = getWeatherInfo(daily.weather_code[i]);
    
    forecasts.push({
      date: daily.time[i],
      tempMin: Math.round(daily.temperature_2m_min[i]),
      tempMax: Math.round(daily.temperature_2m_max[i]),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: 0, // Daily doesn't include humidity
      windSpeed: Math.round(daily.wind_speed_10m_max[i]),
      pop: daily.precipitation_probability_max[i] || 0,
      sunrise: daily.sunrise[i],
      sunset: daily.sunset[i],
      uvIndexMax: daily.uv_index_max[i],
    });
  }
  
  return forecasts;
}

/**
 * Get weather summary text
 */
export async function getWeatherSummary(city?: string, country?: string): Promise<string> {
  const current = await getCurrentWeather(city, country);
  
  let summary = `${current.icon} ${current.city}, ${current.country}: ${current.temperature}°C`;
  summary += ` (feels like ${current.feelsLike}°C)`;
  summary += ` - ${current.description}`;
  summary += `. Humidity: ${current.humidity}%`;
  summary += `, Wind: ${current.windSpeed} km/h`;
  
  if (current.uvIndex !== undefined && current.uvIndex > 0) {
    summary += `, UV Index: ${current.uvIndex}`;
  }
  
  if (current.precipitation > 0) {
    summary += `, Precipitation: ${current.precipitation}mm`;
  }
  
  return summary;
}

/**
 * Get brief weather for daily briefing
 */
export async function getBriefWeather(city?: string, country?: string): Promise<{
  current: string;
  today: string;
}> {
  const current = await getCurrentWeather(city, country);
  const daily = await getDailyForecast(city, country);
  const today = daily[0];
  
  return {
    current: `${current.icon} ${current.temperature}°C, ${current.description}`,
    today: today 
      ? `High: ${today.tempMax}°C, Low: ${today.tempMin}°C, ${today.pop}% chance of rain`
      : 'Forecast unavailable',
  };
}

/**
 * Get weather icon URL (using Open-Meteo's recommended icons)
 */
export function getIconUrl(weatherCode: number): string {
  // Map to OpenWeatherMap icons for compatibility
  const iconMap: Record<number, string> = {
    0: '01d', 1: '01d', 2: '02d', 3: '03d',
    45: '50d', 48: '50d',
    51: '09d', 53: '09d', 55: '09d',
    56: '13d', 57: '13d',
    61: '10d', 63: '10d', 65: '10d',
    66: '13d', 67: '13d',
    71: '13d', 73: '13d', 75: '13d', 77: '13d',
    80: '09d', 81: '09d', 82: '09d',
    85: '13d', 86: '13d',
    95: '11d', 96: '11d', 99: '11d',
  };
  
  const icon = iconMap[weatherCode] || '01d';
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
