import './styles.css';

function App() {
  return (
    <>
      <div className="container">
        <div className='title_div'>
          <h1 className='title'>CEPFINDER</h1>
          <div className='container_input'>
            <input className='input_search' type='text' placeholder="CEP NUMBER..." />
            <button className='button_search'>
              🔎
            </button>
          </div>
        </div>

        <main className="main">
          <h2>CEP 000.000-000</h2>
          <span>Rua</span>
          <span>Bairro</span>
          <span>Cidade</span>
          <span>Estado</span>


        </main>
        
      </div>
      
    </>
  );
}

export default App;
