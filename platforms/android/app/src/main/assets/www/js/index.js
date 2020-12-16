function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

  ///////////////////FUNÇÃO PARA SAIR DO APP

  function funcaoSair(){ // fução do botão sair do app
    var x; //variavel x
    var r= confirm("Deseja realmente sair?");  //r recebendo caixa de dialogo confirm
    
    if (r==true){  //se r for verdadeiro
      x= navigator.app.exitApp(); // fecha o app
      
      }else{ // se r for falso
      x="Você pressionou Cancelar!"; // não faz nada
      }  
    }