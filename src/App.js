import { useState } from 'react';
import './styles.css';
import apicep from './services/apicep';

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});       //pode vir com mais de uma entrada / criar metodo de inserir todas as entradas
  const [adress, setAdress] = useState({});

//INPUT CHECK: 0 -- VAZIO // 1 -- NUM CEP VALIDO // 2 -- NUM CEP INVALIDO // 3 -- ENDEREÇO COMPLETO VALIDO // 4 -- CORRIGIR TABULAÇÃO // 5 -- FALTANDO(item)
  async function handleInput(i) {
    const  new_array = [];
    //IF BLANK
    if (i.length === "") {
      alert("Campo de pesquisa vazio.")
      return 0; // 0 - VAZIO
    }
    
    const input_array = i.split('');
    
    //SE CEP NUMERO
    if (i.length === 8 ) {
      for (let id = 0; id < input_array.length; id++) {
        const isInt = parseInt(input_array[id]);
        if ( !isNaN(isInt) ) {
          new_array.push(isInt)
        }
      }
      if (new_array.length === 8) {
        return 1; // 1 - CEP NUM
      } else {
        return 2; // 2 - NUM CEP INVALIDO
      }
    }

  //SE ENDEREÇO COMPLETO (logradouro, complemento - bairro, localidade - uf)
    if (i.length > 10) {
      //remover acentos!!!
      //validar dados de input
      //trocar " " por "+" ses pesquisa abrangente
      const firstComma = input.indexOf(',');
      const firstDash = input.indexOf('-');
      const secondComma = input.indexOf(',', firstComma + 1);
      const secondDash = input.indexOf('-', firstDash + 1);
      
      const logradouro = input.substring(0, firstComma).trim();
      const complemento = input.substring(firstComma+1, firstDash).trim();
      const bairro = input.substring(firstDash + 1, secondComma).trim();
      const localidade = input.substring(secondComma + 1, secondDash).trim();
      const uf = input.substring(secondDash+2, secondDash + 4).trim();
      setAdress({
        logradouro: logradouro,
        complemento: complemento,
        bairro: bairro,
        localidade: localidade,
        uf: uf
      });
      return 3
    }
  };

  //HANDLE SEARCH INPUT
  async function handleSearch(){
    console.log(input)
    const result = await handleInput(input);
    console.log("RESULT: " + `${result}`)

    switch (result) {
      case 0:
        return alert("!!!");
      case 1:
        try {
          //procurar cep
          const response = await apicep.get(`${input}/json/`);
          response.data.erro && alert("Número de Cep não encontrado")
          !response.data.erro && setCep(response.data) && setInput("");
          console.log(response)
          // setInput("");
          

        }catch{
          alert("Digite um número de CEP ou um endereço completo com lougradouro, complemento - bairro, estado - uf");
        }

        break;
      case 2:
        return alert("Número de CEP inválido!");
      case 3:
        //procurar endereço
        try {
          console.log(adress)
          const response = await apicep.get(`${adress.uf}/${adress.localidade}/${adress.logradouro}/json/`)
          console.log(response)
          setCep(response.data[0]);
          // setInput("");
        }catch {
          alert("Endereço não foi encontrado")
        }
        break;
      case 4:
        return alert("Endereço incompleto! Tente: 'Logradouro, Bairro - Cidade, UF'");
      case 5: 
        return alert("Endereço não encontrado!");
      default:
        //alert
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
