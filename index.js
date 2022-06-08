const prompt = require('prompt-sync')();
console.clear()

//Introdução.
console.log('JOGO DA VELHA!');
prompt('Pressione ENTER para começar!');

//Declarando variáveis globais.
let jogando = 'sim';
let coordenadas;
//Variável para controle do vencedor de cada rodada. (REQUISITO).
let pontosJogadorUm = 0;
let pontosJogadorDois = 0;
let quemJoga = 0;
let nomeJogador = 'Jogador 1';

//Laço de repetição que determinará se os jogadores querem continuar o jogo ou não. (REQUISITO).
while (jogando == 'sim') {
    console.clear()

    //Declarando a MATRIZ. (REQUISITO).
    let arrayJogo = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    
    //Perguntando ao jogador 1 o símbolo que deseja usar.
    let escolhaJogadorUm = prompt('Jogador 1 é [X] ou [O]: ').toUpperCase();
    let escolhaJogadorDois;
    
    //Loop caso a resposta seja diferente de X ou O.
    while (escolhaJogadorUm != 'X' && escolhaJogadorUm != 'O') {
        console.clear()
        console.log('ESCOLHA INVÁLIDA!')
        escolhaJogadorUm = prompt('Jogador 1 é [X] ou [O]: ');
        if ((escolhaJogadorUm = 'X') && (escolhaJogadorUm = 'O')) {
            break;
        }
    }

    //Se o jogador 1 escolher X o jogador 2 é O, vice-versa.
    if (escolhaJogadorUm == 'X') {
        escolhaJogadorDois = 'O';
    }else {
        escolhaJogadorDois = 'X';
    }
    
    //Mostrando aos jogadores seus respectivos símbolos.
    console.log()
    console.log(`O Jogador 1 é: ${escolhaJogadorUm} \nO Jogador 2 é: ${escolhaJogadorDois}`);
    prompt('Pressione ENTER para continuar.')
    

    //Loop das partidas.
    while (true) {
        //Declarando a variável simbolo para determinar qual será demarcado na rodada.
        let simbolo;

        //Estrutura para trocar os jogadores e seus símbolos a cada rodada.
        if (quemJoga == 0) {
            simbolo = escolhaJogadorUm;
            quemJoga = 1;
            nomeJogador = 'Jogador 1';
        }else if (quemJoga == 1) {
            simbolo = escolhaJogadorDois;
            quemJoga = 0;
            nomeJogador = 'Jogador 2';
        }

        //Mostrando o tabuleiro.
        console.clear()
        console.table(arrayJogo);
        console.log()

        //Perguntando as coordenadas. (REQUISITO).
        console.log(`${nomeJogador}`);
        let linha = +prompt('Escolha a LINHA: ');
        let coluna = +prompt('Escolha a COLUNA: ');

        //Chamando as funções.
        coordenadas = localizandoCoordenadas(coluna,linha);

        jogar(coordenadas,arrayJogo,simbolo);

        //Verificando se existe vitória.
        valorVitoria = verificarVitoria(arrayJogo,nomeJogador);

        if (valorVitoria == 1){
            console.clear()
            console.log(`Quem ganhou foi o ${nomeJogador}!`);
            prompt('Pressione ENTER.');
            if (quemJoga == 0) {
                pontosJogadorUm += 1;
            } else if (quemJoga == 1) {
                pontosJogadorDois += 1;
            }
            quemJoga = 0;
            break;
        }else {
            continue;
        }  
    }

    //Perguntando ao jogador se ele quer jogar novamente.
    console.log('Você quer jogar novamente? Digite SIM ou NAO.');
    jogando = prompt('').toLowerCase();

}

//Mostrar o resultado e quem foi o grande vencedor. (REQUISITO).
console.clear()
console.log('RESULTADO FINAL \n=================');
console.log(`Pontos Jogador 1: ${pontosJogadorDois}`);
console.log(`Pontos Jogador 2: ${pontosJogadorUm}`);
console.log()

if (pontosJogadorUm<pontosJogadorDois) {
    console.log('Jogador 1 foi o grande CAMPEÃO!');
}else if (pontosJogadorDois<pontosJogadorUm) {
    console.log('Jogador 2 foi o grande CAMPEÃO!');
}else {
    console.log('O resultado final foi EMPATE!');
}

//Funções

function verificarVitoria(a){
    //LINHAS
    for (let i=0;i<3;i++) {
        if ((a[i][0] == a[i][1]) && (a[i][1] == a[i][2]) && (a[i][0] != '')) {
            return 1;
        }
    }

    //COLUNAS
    for (let i=0;i<3;i++) {
        if ((a[0][i] == a[1][i]) && (a[1][i] == a[2][i]) && (a[0][i] != '')) {
            return 1;
        }
    }

    //DIAGONAIS
    if ((a[0][0] == a[1][1]) && (a[1][1] == a[2][2]) && (a[0][0] != '')) {
        return 1;
    }else if ((a[0][2] == a[1][1]) && (a[1][1] == a[2][0]) && (a[0][2] != '')) {
        return 1;
    }
}

function jogar(p,a,ej) { 
    switch(p) {
        case 1:
            if(a[0][0] == '') {
                a[0][0] = ej         
            }
        break;

        case 2:
            if(a[0][1] == '') {
                a[0][1] = ej
            }
        break;

        case 3:
            if(a[0][2] == '') {
                a[0][2] = ej
            }
        break;

        case 4:
            if(a[1][0] == '') {
                a[1][0] = ej
            }
        break;

        case 5:
            if(a[1][1] == '') {
                a[1][1] = ej
            }
        break;

        case 6:
            if(a[1][2] == '') {
                a[1][2] = ej
            }
        break;

        case 7:
            if(a[2][0] == '') {
                a[2][0] = ej
            }
        break;

        case 8:
            if(a[2][1] == '') {
                a[2][1] = ej
            }
        break;

        case 9:
            if(a[2][2] == '') {
                a[2][2] = ej
            }
        break;
    }  
}

function localizandoCoordenadas(c,l) {
    if (c == 0 && l == 0) {
        return 1;
    }else if (c == 1 && l == 0) {
        return 2;
    }else if (c == 2 && l == 0) {
        return 3;
    }else if (c == 0 && l == 1) {
        return 4;
    }else if (c == 1 && l == 1) {
        return 5;
    }else if (c == 2 && l == 1) {
        return 6;
    }else if (c == 0 && l == 2) {
        return 7;
    }else if (c == 1 && l == 2) {
        return 8;
    }else if (c == 2 && l == 2) {
        return 9;
    }
}