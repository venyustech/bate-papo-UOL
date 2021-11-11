    let userInput;
function signUser(errorHandled){
    
    if(errorHandled === true)
        userInput = prompt("Vish...Esse nome já esta em uso\nEscreva outro nome");
    else
        userInput = prompt("Escreva seu nome");

    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: userInput});

    promisse.then(handleSuccess); // when request returns successfully
    promisse.catch(handleError); // when an error occurs in the request
}
signUser(false);

function handleSuccess(answer){
    console.log(answer);
    alert('usuariologado')
    setInterval(isUserOnline, 5000); //Schedule isUSerOnline to run periodically every 1 second
}
function handleError(error){
    console.log(error);
    let errorHandled = true;
    signUser(errorHandled);
}
function isUserOnline(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: userInput});

    promisse.then(loadChat); 
    promisse.catch(userOffline); //fazer nada??

}
function loadChat(answer){
    alert('usuario continua logado');
    console.log(answer);
}
function userOffline(answer)
{
    alert('usuario offline');
}