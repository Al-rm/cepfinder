import { useEffect, useState } from 'react';
import './styles.css';
import apicep from './services/apicep';
import { handleInput } from './services/handleInput';

function App() {

  const [input, setInput] = useState("");     //informação fornecida pelo usuário
  const [output, setOutput] = useState({});   //informação exibida na tela
  const alerts = ["Campo de pesquisa vazio.", "Numero de CEP ou Endereço inválido.", "" ,""]
  // const [cep, setCep] = useState({});         //informação retornada do viacep (api)
  // const [adress, setAdress] = useState({});   //informação temporária do input para pesquisa
 

  //HANDLE SEARCH INPUT
  async function handleSearch(){
    const result = await handleInput(input);
    // console.log(result)
    // if result.uf && result.localidade && result.logradour : pequisa endereço   !!!!
    // if result. cep : pesquisa CEP                                              !!!!
    switch (result.id) {
      case 0:
        setOutput(result) //mostrar formato de input possiveis no main
        return
      case 2:
        try {
          //procurar numero cep
          const response = await apicep.get(`${input}/json/`);
          response.data.erro && alert("Número de Cep não encontrado.")
          !response.data.erro && setOutput(response.data)
          setInput("");
        }catch{
          alert("Número de CEP inválido.");
        }
        break;
      case 3:
        try {
          //procurar endereço completo
          const response = await apicep.get(`${result.uf}/${result.localidade}/${result.logradouro}/json/`)
          console.log(response)
          !response.data.length && alert("Endereço não encontrado.")
          response.data.length && setOutput(response.data[0]);
          setInput("");
        }catch {
          alert("Endereço inválido, tente 'logradouro, estado - UF.")
        }
        break;
      default:
        setOutput(result);
        setInput("");
        break;
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
            placeholder="Número do CEP ou Endereço Completo" 
            value={input}
            onChange={(e) => setInput(e.target.value) }
            />
            <button className='button_search' onClick={handleSearch}>🔎</button>
          </div>
        </div>

        {Object.keys(output).length > 0 && (
          <main className="main">
            <h2>{alerts[output.id]}</h2>
            <h2 className='output_text'>{output.cep}</h2>
            <span>{"Logradouro: " && output.logradouro}</span>
            <span>{output.complemento}</span>
            <span>{output.bairro}</span>
            <span>{output.localidade && "-" && output.uf}</span>
          </main>
        )}
      </div>

    </>
  );
}

export default App;
