import './App.css';
import Heures from '../../Components/heures';
import Semaine from '../../Components/semaine';
import { useState } from 'react';

function App() {
  const [affichageSemaine, setAffichageSemaine] = useState(false); // Toggle entre heures/semaine
  const [ville, setVille] = useState(''); // Saisie de la ville
  const [villeValidee, setVilleValidee] = useState(''); // Ville validée après soumission

  const handleVilleChange = (e) => {
    setVille(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ville.trim() !== '') {
      setVilleValidee(ville);
    }
  };

  return (
    <div className="App">
      <h1 className="title">🌤️ Météo</h1>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Entrez une ville"
          value={ville}
          onChange={handleVilleChange}
        />
        <button type="submit">Rechercher</button>
      </form>

      <button
        onClick={() => setAffichageSemaine((prev) => !prev)}
        className="toggle-btn"
      >
        Passer en affichage par {affichageSemaine ? 'heures' : 'semaine'}
      </button>

      {villeValidee && !affichageSemaine && <Heures ville={villeValidee} />}
      {villeValidee && affichageSemaine && <Semaine ville={villeValidee} />}


    </div>
  );
}

export default App;
