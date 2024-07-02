// src/App.js
import { saveAs } from 'file-saver';
import React from 'react';
import ProjectCharterForm from './components/ProjectCharterForm';

const App = () => {
  const handleSave = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'project_charter.json');
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        alert('Dados carregados: ' + JSON.stringify(data, null, 2));
        // Aqui você pode definir o estado do formulário com os dados carregados.
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      <ProjectCharterForm onSave={handleSave} onLoad={handleLoad} />
    </div>
  );
};

export default App;
