import React, { useEffect, useState } from 'react';
import './heures.css';

export default function Heures({ ville }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      const apiKey = "962bee4aee5dbe5cb34c519f28b25334";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();
        const now = new Date();

        // Filtrer les données pour les prochaines 24 heures
        const filteredData = data.list.filter((entry) => {
          const entryDate = new Date(entry.dt_txt);
          const timeDifference = (entryDate - now) / (1000 * 60 * 60); // Différence en heures
          return timeDifference >= 0 && timeDifference <= 24;
        });

        setHourlyData(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyWeather();
  }, [ville]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;

  return (
    <div className="heures">
      <h2>📅 Températures pour aujourd'hui ({ville})</h2>
      <div className="hourly-grid">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hour-card">
            <p>
              {new Date(hour.dt_txt).getHours()}h
            </p>
            <p>🌡️ {hour.main.temp} °C</p>
            <p>{hour.weather[0]?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
