    let userInput;
function signUser(errorHandled){
    if(errorHandled === true)
        userInput = prompt("Vish...Esse nome já esta em uso\nEscreva outro nome");
    else
        userInput = prompt("Escreva seu nome");

    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: userInput});

    promisse.then(handleSuccess);
    promisse.catch(handleError);
}
signUser(false);

function handleSuccess(answer){
    isUserOnline();
    setInterval(isUserOnline, 3000);
}
function handleError(error){
    let errorHandled = true;
    signUser(errorHandled);
}
function isUserOnline(){
    const promisse = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: userInput});
    promisse.then(userOnline); 
    promisse.catch(userOffline);
}
function userOffline(error){
    console.log(error.response);
    alert('error#1 - Usuario offline');
}

function userOnline(answer){  
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(chatLoaded); 
    promisse.catch(loadingChatError); 
}
function loadingChatError(error){
    console.log(error.response);
    alert('error#2 - Nao foi possivel carregar chat');
}

function chatLoaded(answer){
    const chat = answer.data
    const chatLoading = document.querySelector("main");
    chatLoading.innerHTML = "";
    for (let i = 0; i < chat.length; i++){
        if(chat[i].type === 'status'){
            chatLoading.innerHTML += `<div class="status-message box-chat" id = "c${i}" data-identifier="message">
            <p><span class = "hours">(${chat[i].time})</span> <span class = "from">${chat[i].from}</span> ${chat[i].text}</p>
            </div>`;
        }
        else if(chat[i].type === 'message'){
            chatLoading.innerHTML += `<div class="public-message box-chat" id = "c${i}" data-identifier="message">
            <p><span class = "hours">(${chat[i].time})</span> <span class = "from">${chat[i].from}</span> para <span class = "to">${chat[i].to}:</span> ${chat[i].text}</p>
            </div>`;
        }
        else if((chat[i].type === 'private_message')  && (chat[i].from === userInput ||  chat[i].to === userInput)){
            chatLoading.innerHTML += `<div class="private-message box-chat" id = "c${i}" data-identifier="message">
            <p><span class = "hours">(${chat[i].time})</span> <span class = "from">${chat[i].from}</span> reservadamente para <span class = "to">${chat[i].to}:</span> ${chat[i].text}</p>
            </div>`;
        }
    }
    let scrollInto = document.querySelector("main");
    scrollInto.lastElementChild.scrollIntoView();
}

function sendMessage(){
    const inputSendMessage = document.querySelector("#send-message");
    const objMessage = {
        from: userInput,
	    to: "Todos",
	    text: inputSendMessage.value,
	    type: "message" 
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",objMessage);
    promisse.then(handleSendSuccess); 
    promisse.catch(handleSendError); 
}
function handleSendError(error){
    console.log(error.response);
}
function handleSendSuccess(answer){
    isUserOnline();
} 
