import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailCard.css';
import weight from '../../../assets/weight.svg';
import height from '../../../assets/straighten.svg';

interface PokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const typeColors: { [key: string]: string } = {
  normal: '#AAA67F',
  fighting: '#C12239',
  flying: '#A891EC',
  poison: '#A43E9E',
  ground: '#DEC16B',
  rock: '#B69E31',
  bug: '#A7B723',
  ghost: '#705898',
  steel: '#B7B9D0',
  fire: '#F57D31',
  water: '#6493EB',
  grass: '#74CB48',
  electric: '#F9CF30',
  psychic: '#FB5584',
  ice: '#9AD6DF',
  dragon: '#7037FF',
  dark: '#75574C',
  fairy: '#E69EAC',
};

const DetailCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data: PokemonData = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokémon not found</p>;

  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType] || '#A8A878';

  return (
    <div className="detail-card" style={{ backgroundColor: bgColor }}>
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>

      <div className="header">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <span className="pokemon-id">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
      </div>

      <div className="circle-overlay"></div>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />

      <div className="bottom-section">
        <div className="inner-content">
          <div className="types">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="type-badge"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <h3 className="info-title" style={{ color: bgColor }}>
            About
          </h3>
          <div className="info-container">
            <div className="info-item">
              <img src={weight} alt="weight" className="info-icon" />
              <p className="info-value">{pokemon.weight / 10} kg</p>
              <span className="info-label">Weight</span>
            </div>

            <div className="info-divider"></div>

            <div className="info-item">
              <img src={height} alt="height" className="info-icon" />
              <p className="info-value">{pokemon.height / 10} m</p>
              <span className="info-label">Height</span>
            </div>

            <div className="info-divider"></div>

            <div className="info-item">
              <p className="info-value">
                {pokemon.abilities
                  .slice(0, 2)
                  .map((ability) => ability.ability.name)
                  .join('\n')}
              </p>
              <span className="info-label">Moves</span>
            </div>
          </div>

          <div className="stats" style={{ color: bgColor }}>
            <h3 className="stars-title">Base Stats</h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat">
                <span className="stat-name">
                  {stat.stat.name.toUpperCase()}
                </span>
                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{
                      width: `${(stat.base_stat / 150) * 100}%`,
                      backgroundColor: bgColor,
                    }}
                  ></div>
                </div>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
