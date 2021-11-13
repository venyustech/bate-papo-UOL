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
    isUserOnline();
    //setInterval(isUserOnline, 5000); //Schedule isUSerOnline to run periodically every 1 second
}
function handleError(error){
    let errorHandled = true;
    signUser(errorHandled);
}
function isUserOnline(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: userInput});

    promisse.then(loadingChat); 
    promisse.catch(userOffline); //fazer nada??
}
function userOffline(answer)
{
    console.log(answer.response);
    alert('error#1 - Usuario offline');
}
function loadingChat(answer){  
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(chatLoaded); // when request returns successfully
    promisse.catch(loadingChatError); // when an error occurs in the request
}
function loadingChatError(error){
    alert('error#2 - Nao foi possivel carregar chat');
}
function chatLoaded(answer){
    console.log(answer);
    const chat = answer.data
    const chatLoading = document.querySelector("main");

    for (let i = 0; i < chat.length; i++) {
        if(chat[i].type === 'status'){
            chatLoading.innerHTML += `<div class="status-message box-chat">
                <p>(${chat[i].time}) <strong>${chat[i].from}</strong> ${chat[i].text}</p>
                </div>`;
        }
        else if(chat[i].type === 'message'){
            chatLoading.innerHTML += `<div class="public-message box-chat">
                                        <p>(${chat[i].time}) <strong>${chat[i].from}</strong> para Todos: ${chat[i].text}</p>
                                      </div>`;
        }else if(chat[i].type === 'private_message'){
            chatLoading.innerHTML += `<div class="private-message box-chat">
                                        <p>(${chat[i].time}) <strong>${chat[i].from}</strong> reservadamente para ${chat[i].to}: ${chat[i].text}</p>
                                      </div>`;
        }
    }

}
