import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleListRepository() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Desafio Conceitos do ReactJS",
      "url": "https://github.com/leotubarao/conceitos-reactjs",
      "techs": ["reactjs", "desafio", "bootcamp", "gostack"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const response = await repositories.filter(repository => repository.id !== id);

    setRepositories(response);
  }

  useEffect(() => {
    handleListRepository()
  }, []);

  const listItems = repositories.map(repository => 
    <li key={repository.id}>
      <h3>{repository.title}</h3>

      <button onClick={() => handleRemoveRepository(repository.id)}>
        Remover
      </button>
    </li>
  );

  return (
    <div className="container">
      <ul data-testid="repository-list">

        { listItems }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
