'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [github, setGithub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Weather for New York (or change lat/lon)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=America/New_York&forecast_days=3')
      .then(r => r.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // GitHub recent public events for the user
    fetch('https://api.github.com/users/lankapo79-droid/events/public?per_page=5')
      .then(r => r.json())
      .then(setGithub)
      .catch(() => {});
  }, []);

  const weatherCodeToEmoji = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    return '🌩️';
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#14110e', margin: 0, fontSize: 32 }}>Good evening, Azlan 💛</h1>
        <p style={{ color: '#14110e', opacity: 0.6, margin: '4px 0 0' }}>Your cute personal dashboard</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Weather Card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(20,17,14,0.06)' }}>
          <h2 style={{ margin: '0 0 12px', color: '#14110e', fontSize: 18 }}>Weather 🌤️</h2>
          {loading ? <p>Loading...</p> : weather?.current ? (
            <>
              <div style={{ fontSize: 42, fontWeight: 600, color: '#e39a3c' }}>
                {Math.round(weather.current.temperature_2m)}°C {weatherCodeToEmoji(weather.current.weather_code)}
              </div>
              <p style={{ margin: '4px 0', color: '#14110e' }}>New York</p>
              <div style={{ marginTop: 12, fontSize: 14, color: '#14110e', opacity: 0.8 }}>
                {weather.daily.time.map((day, i) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
                    <span>{new Date(day).toLocaleDateString('en', { weekday: 'short' })}</span>
                    <span>{Math.round(weather.daily.temperature_2m_min[i])}° / {Math.round(weather.daily.temperature_2m_max[i])}°</span>
                  </div>
                ))}
              </div>
            </>
          ) : <p>Weather unavailable</p>}
        </div>

        {/* Calendar Card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(20,17,14,0.06)' }}>
          <h2 style={{ margin: '0 0 12px', color: '#14110e', fontSize: 18 }}>Today 📅</h2>
          <p style={{ color: '#14110e', opacity: 0.8 }}>Friday, November 13</p>
          <ul style={{ paddingLeft: 18, color: '#14110e', lineHeight: 1.6 }}>
            <li>Work on Epicycles app</li>
            <li>Check GitHub & Vercel</li>
            <li>Family time 💛</li>
          </ul>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 16 }}>Connect Google Calendar later for real events</p>
        </div>

        {/* GitHub Card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 4px 20px rgba(20,17,14,0.06)' }}>
          <h2 style={{ margin: '0 0 12px', color: '#14110e', fontSize: 18 }}>GitHub Activity</h2>
          {github.length > 0 ? github.slice(0, 5).map((event, i) => (
            <div key={i} style={{ fontSize: 14, margin: '8px 0', color: '#14110e' }}>
              <strong>{event.type.replace('Event', '')}</strong> on {event.repo.name.split('/')[1]}
              <div style={{ fontSize: 12, opacity: 0.6 }}>{new Date(event.created_at).toLocaleString()}</div>
            </div>
          )) : <p style={{ opacity: 0.6 }}>No recent public activity</p>}
          <a href="https://github.com/lankapo79-droid" target="_blank" rel="noreferrer" style={{ color: '#e39a3c', fontSize: 14 }}>View profile →</a>
        </div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: 40, color: '#14110e', opacity: 0.5, fontSize: 13 }}>
        Made with love by Aina for Azlan 💛
      </footer>
    </div>
  );
}