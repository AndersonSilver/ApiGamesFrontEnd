// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Acesso usuario
function login(){
    let email= document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    

    axios.post("http://localhost:3000/autenticacao",{
        email,
        senha
    }).then( res =>{

        let token = res.data.token;
        localStorage.setItem("token", token)
        alert("Logadooooo!" + token);
    }).catch( err =>{
        alert("Usuario nao foi logado!");
    })
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Configuração axios

var axiosConfig = {

    headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRlcnNvbnNpbHZlcjE4QGdtYWlsLmNvbSIsImlhdCI6MTY3OTY3MjE1MiwiZXhwIjoxNjc5ODQ0OTUyfQ.ahYC2tsDY4GwNIl01yANdDe-jPN8zoL97tOTDymxe-E"
    }   
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para criar gamer

function createGame(){

    let titleInput = document.getElementById("title");
    let priceInput = document.getElementById("price");
    let yearInput = document.getElementById("year");

    var game = {
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value,
    }

    axios.post("http://localhost:3000/games",game).then(response =>{
        if(response.status == 200){
            window.location.reload();
        }
    }).catch( err =>{
        console.log(err)
    });
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para Deletar Gamer

function deleteGame(deleteItem){
    
    let id = deleteItem.getAttribute("data-id");
    
    axios.delete("http://localhost:3000/games/"+id).then( response =>{
        alert("Game Deletado");
    }).catch(err =>{
        console.log(err)
    });
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Função para carregar os dados no form Front End

function loadForm(listItem){
        let id = listItem.getAttribute("data-id");
        let title = listItem.getAttribute("data-title");
        let year = listItem.getAttribute("data-year");
        let price = listItem.getAttribute("data-price");

        document.getElementById("idEdit").value = id;
        document.getElementById("titleEdit").value = title;
        document.getElementById("yearEdit").value = year;
        document.getElementById("priceEdit").value = price;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para editar gamer

function EditGames(){

    let idInput = document.getElementById("idEdit");
    let titleInput = document.getElementById("titleEdit");
    let priceInput = document.getElementById("priceEdit");
    let yearInput = document.getElementById("yearEdit");

    var game = {
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value,
    }

    let id = idInput.value;

    axios.put("http://localhost:3000/games/"+id,game).then(response =>{
        if(response.status == 200){
            window.location.reload();
        }
    }).catch( err =>{
        console.log(err)
    });  
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função que mostra os dados do banco de dados no Front End e criação dos botoes EDIT e DELETE

axios.get("http://localhost:3000/games", axiosConfig).then(response => {

    let games = response.data;
    let list = document.getElementById("games");

    games.forEach(game => {
        let item = document.createElement("li");

        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);

        item.setAttribute("idEdit", game.id);
        item.setAttribute("titleEdit", game.title);
        item.setAttribute("yearEdit", game.year);
        item.setAttribute("priceEdit", game.price);

        item.innerHTML = game.id + " " + game.title + "- $" + game.price;

        let deleBtn = document.createElement("button");
        deleBtn.innerHTML = "Deletar"

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Editar"

        deleBtn.addEventListener("click", ()=>{
            deleteGame(item)
            window.location.reload();
        })
        editBtn.addEventListener("click", ()=>{
            loadForm(item)
        })
        
        item.appendChild(editBtn)
        item.appendChild(deleBtn)
        list.appendChild(item)
    });
}).catch(erro =>{
    console.log(erro)
})