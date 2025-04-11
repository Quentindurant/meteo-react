import React, { useEffect, useState } from 'react';
import './semaine.css';

export default function Semaine({ ville }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyForecast = async () => {
      const apiKey = "962bee4aee5dbe5cb34c519f28b25334";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();

        // Filtrer les prévisions pour une par jour (à midi) sur 6 jours
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes('12:00:00')
        );

        setForecastData(dailyData.slice(0, 6)); // Afficher aujourd'hui + 5 prochains jours
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyForecast();
  }, [ville]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;

  return (
    <div className="semaine">
      <h2>📅 Prévisions pour {ville}</h2>
      <div className="forecast-grid">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>
              {new Date(day.dt_txt).getDate()} {new Date(day.dt_txt).toLocaleString('fr-FR', { month: 'short' })}
            </p>
            <p>🌡️ {day.main.temp} °C</p>
            <p>💧 {day.main.humidity} %</p>
            <p>{day.weather[0]?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
