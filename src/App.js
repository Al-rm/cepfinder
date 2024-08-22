import { useState } from 'react';
import './styles.css';
import apicep from './services/apicep';

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch(){
    //INPUT CHECK
    if (input === '') {
      alert("Campo de pesquisa vazio.")
      return;
    }
    try {
      const response = await apicep.get(`${input}/json/`);
      setCep(response.data);
      setInput("")
    }catch{
      alert("Endereço não encontrado.")
      setInput("");
    }
  }


  return (
    <>
      <div className="container">
        <div className='title_div'>
          <h1 className='title'>CEPFINDER</h1>
          <div className='container_input'>
            <input 
            type='text' 
            placeholder="CEP NUMBER..." 
            value={input}
            onChange={(e) => setInput(e.target.value) }
            />
            <button className='button_search' onClick={handleSearch}>🔎</button>
          </div>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
      </div>

    </>
  );
}

export default App;
