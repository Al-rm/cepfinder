export async function handleInput(input) {
    //retorna um objeto com os resultados do input reconhecido //constructor?
    const result = {};
    if (input === '') {
        result.id = 0 //0 - pesquisa em branco
        return result;  
    }

    const tiposLogradouro = [
        "Rua", "R.", "Avenida", "Av.", "Travessa", "Tv.", "Alameda", "Al.", "Praça", "Pç.", "Rodovia", "Rod.", "Estrada", "Est.", "Viela", "Vl.", "Largo", "Lgo.", "Beco", "Bco.", "Via"
    ];
    const ufs = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    //pesquisa entradas e matchs no input 
        //UF
    const regexUF = new RegExp(`\\b(${ufs.join("|")})\\b`, "i");
    const ufMatch = input.match(regexUF);
    if (ufMatch) {
        result.uf = ufMatch[0]
    } else {
        result.id = 1 //"Insira uma 'UF' válida.\n"
    }
        //localidade (cidade)
    const regexLocalidade = new RegExp(`([^,-]+)\\s*[-,]\\s+${result.uf}`, "i");
    const localidadeMatch = input.match(regexLocalidade);
    if (localidadeMatch) {
        result.localidade = localidadeMatch[1].trim();
    } else {
        result.id = 1 //"Insira uma 'Cidade - UF'. Exemplo: 'Niterói - RJ' ou 'Niteŕoi, RJ'.\n"
    }
        //logradouro
    // const regexLogradouro = new RegExp(`(${tiposLogradouro.join("|")})\\s*[-,]\\s*([^,-]+)`, "i");
    const regexLogradouro = new RegExp(`(${tiposLogradouro.join("|")})\\s*[^,-]*`, "i");
    const logradouroMatch = input.match(regexLogradouro);
    // console.log(logradouroMatch)
    if (logradouroMatch) {
        result.logradouro = logradouroMatch[0];
    } else {
        result.id = 1 // "Insira um 'Logradouro' válido. Exemplo: 'Rua das Flores' ou 'Rua das Flores, 101'.\n"
    }
    if (result.uf && result.localidade && result.logradouro) {
        result.id = 3
    };
    //reconhecer número do CEP
    const regexCEP = /\b\d{5}-?\d{3}\b/;
    const cepMatch = input.match(regexCEP);
    if (cepMatch) {
        result.cep = cepMatch[0];
        result.id = 2
    } else if (result.id != 3) {
        result.id = 1 // "Número de CEP não fornecido."
    }
    //set result
    console.log(result)
   
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(result);
        }, 100)
    });
}