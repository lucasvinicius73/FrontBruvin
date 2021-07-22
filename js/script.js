var pass = document.getElementById('pass');
var orig = document.getElementById("orig");
var dest = document.getElementById("dest");
var ida = document.getElementById("ida");
var volta = document.getElementById("volta");
var iev = document.getElementById("iev");
var soid = document.getElementById("soid");
var tbody = document.getElementById("tbody");
var tabela = document.getElementById("tabe");
var linha = tabela.getElementsByTagName("tr");
var passag = document.getElementById("passag");
var cid = document.getElementById("cid");
var chk_in = document.getElementById("chk_in");
var chk_out = document.getElementById("chk_out");
var hos = document.getElementById("hos");
var quar = document.getElementById("quar");

function getTickets() {
    
    var urlstr = "http://localhost:3000/tickets/"+orig.value+"/"+dest.value+"/"+ida.value;
    
    $.ajax({
        url : urlstr,
        type : "GET",
        dataType : "json",
        success : function(data){
            for (let index = 0; index < data.length; index++) {
                
                var tr = tbody.insertRow();
                
                var td_orig = tr.insertCell(); 
                var td_desti = tr.insertCell();
                var td_date = tr.insertCell();
                var td_price = tr.insertCell();
                
                td_orig.innerText = data[index]["origin"];
                td_desti.innerText = data[index]["destination"];
                td_date.innerText = data[index]["date"];
                td_price.innerText = data[index]["price"]*hos;
            }
            for(var i=0;i<linha.length;i++){
                var lin = linha[i];
                lin.addEventListener("click",function(){
                    selLinha(this,false);
                })
            }
        }
    })
}

function getHosting() {
    
    var urlstr = "http://localhost:3000/hosting/"+orig.value+"/"+ida.value;
    
    $.ajax({
        url : urlstr,
        type : "GET",
        dataType : "json",
        success : function(data){
            for (let index = 0; index < data.length; index++) {
                
                var tr = tbody.insertRow();
                
                var td_orig = tr.insertCell(); 
                var td_desti = tr.insertCell();
                var td_date = tr.insertCell();
                var td_price = tr.insertCell();
                
                td_orig.innerText = data[index]["origin"];
                td_desti.innerText = data[index]["destination"];
                td_date.innerText = data[index]["date"];
                td_price.innerText = data[index]["price"]*hos;
            }
            for(var i=0;i<linha.length;i++){
                var lin = linha[i];
                lin.addEventListener("click",function(){
                    selLinha(this,false);
                })
            }
        }
    })
}



function selLinha(linha){
    var linhas = linha.parentElement.getElementsByTagName("tr");
    for(var i=0;i<linhas.length;i++){
        var linha_ = linhas[i];
        linha_.classList.remove("selecionado");
    }
    linha.classList.toggle("selecionado");
}

var btnVisualizar = document.getElementById("visualizarDados");

btnVisualizar.addEventListener("click", function(){
	var selecionados = tabela.getElementsByClassName("selecionado");
  //Verificar se eestá selecionado
  if(selecionados.length < 1){
  	alert("Selecione pelo menos uma linha");
    return false;
  }
  
  var dados = "";
  
  for(var i = 0; i < selecionados.length; i++){
  	var selecionado = selecionados[i];
    selecionado = selecionado.getElementsByTagName("td");
    dados += "Origem: " + selecionado[0].innerHTML + " - Destino: " + selecionado[1].innerHTML + " - Preco: " + selecionado[2].innerHTML + "\n";
  }

    dados = JSON.stringify({
        origem : selecionado[0].innerHTML,
        destino : selecionado[1].innerHTML,
        data : selecionado[2].innerHTML,
        preco : selecionado[3].innerHTML
    });
    localStorage.setItem("storage",JSON.stringify(dados));
    window.location.href = "pagamento.html";
});

