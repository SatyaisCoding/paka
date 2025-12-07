// src/services/weather.service.ts
// OpenWeatherMap API integration (FREE tier)

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Default location (can be overridden)
const DEFAULT_CITY = process.env.DEFAULT_CITY || 'Delhi';
const DEFAULT_COUNTRY = process.env.DEFAULT_COUNTRY || 'IN';

// ============ INTERFACES ============

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
  timezone: number;
  updatedAt: string;
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
}

// ============ HELPER FUNCTIONS ============

/**
 * Check if Weather API is configured
 */
export function isWeatherConfigured(): boolean {
  return !!OPENWEATHER_API_KEY;
}

/**
 * Make request to OpenWeatherMap API
 */
async function weatherRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('OpenWeatherMap API key not configured. Set OPENWEATHER_API_KEY in environment.');
  }

  const queryParams = new URLSearchParams({
    appid: OPENWEATHER_API_KEY,
    units: 'metric', // Celsius
    ...params,
  });

  const response = await fetch(`${OPENWEATHER_BASE_URL}${endpoint}?${queryParams}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Weather API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Convert Unix timestamp to ISO string
 */
function unixToISO(timestamp: number, timezoneOffset: number = 0): string {
  return new Date((timestamp + timezoneOffset) * 1000).toISOString();
}

/**
 * Get weather icon URL
 */
export function getIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Get weather emoji
 */
function getWeatherEmoji(iconCode: string): string {
  const iconMap: Record<string, string> = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '🌡️';
}

// ============ API FUNCTIONS ============

/**
 * Get current weather by city name
 */
export async function getCurrentWeather(city?: string, country?: string): Promise<CurrentWeather> {
  const q = `${city || DEFAULT_CITY},${country || DEFAULT_COUNTRY}`;
  
  const data = await weatherRequest('/weather', { q });

  return {
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: getWeatherEmoji(data.weather[0].icon),
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    windDirection: data.wind.deg,
    clouds: data.clouds.all,
    visibility: Math.round(data.visibility / 1000), // meters to km
    sunrise: unixToISO(data.sys.sunrise, data.timezone),
    sunset: unixToISO(data.sys.sunset, data.timezone),
    timezone: data.timezone,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Get current weather by coordinates
 */
export async function getWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather> {
  const data = await weatherRequest('/weather', {
    lat: lat.toString(),
    lon: lon.toString(),
  });

  return {
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: getWeatherEmoji(data.weather[0].icon),
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: Math.round(data.wind.speed * 3.6),
    windDirection: data.wind.deg,
    clouds: data.clouds.all,
    visibility: Math.round(data.visibility / 1000),
    sunrise: unixToISO(data.sys.sunrise, data.timezone),
    sunset: unixToISO(data.sys.sunset, data.timezone),
    timezone: data.timezone,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Get 5-day/3-hour forecast by city
 */
export async function getForecast(city?: string, country?: string): Promise<WeatherForecast[]> {
  const q = `${city || DEFAULT_CITY},${country || DEFAULT_COUNTRY}`;
  
  const data = await weatherRequest('/forecast', { q });

  return data.list.map((item: any) => ({
    datetime: item.dt_txt,
    temperature: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
    description: item.weather[0].description,
    icon: getWeatherEmoji(item.weather[0].icon),
    humidity: item.main.humidity,
    windSpeed: Math.round(item.wind.speed * 3.6),
    pop: Math.round(item.pop * 100), // Probability of precipitation %
  }));
}

/**
 * Get daily forecast summary (next 5 days)
 */
export async function getDailyForecast(city?: string, country?: string): Promise<DailyForecast[]> {
  const forecast = await getForecast(city, country);
  
  // Group by date
  const byDate: Record<string, WeatherForecast[]> = {};
  
  for (const item of forecast) {
    const date = item.datetime.split(' ')[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  }
  
  // Aggregate daily data
  return Object.entries(byDate).map(([date, items]) => {
    const temps = items.map(i => i.temperature);
    const pops = items.map(i => i.pop);
    const midday = items.find(i => i.datetime.includes('12:00')) || items[Math.floor(items.length / 2)];
    
    return {
      date,
      tempMin: Math.min(...temps),
      tempMax: Math.max(...temps),
      description: midday.description,
      icon: midday.icon,
      humidity: Math.round(items.reduce((a, b) => a + b.humidity, 0) / items.length),
      windSpeed: Math.round(items.reduce((a, b) => a + b.windSpeed, 0) / items.length),
      pop: Math.max(...pops),
    };
  });
}

/**
 * Get weather summary text
 */
export async function getWeatherSummary(city?: string, country?: string): Promise<string> {
  const current = await getCurrentWeather(city, country);
  
  let summary = `${current.icon} ${current.city}: ${current.temperature}°C`;
  summary += ` (feels like ${current.feelsLike}°C)`;
  summary += ` - ${current.description}`;
  summary += `. Humidity: ${current.humidity}%`;
  summary += `, Wind: ${current.windSpeed} km/h`;
  
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

