
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDG3AhXJgcUskGcJiLqUAfzqJwj832vlIs",
    authDomain: "testeslab-c72db.firebaseapp.com",
    databaseURL: "https://testeslab-c72db.firebaseio.com",
    projectId: "testeslab-c72db",
    storageBucket: "testeslab-c72db.appspot.com",
    messagingSenderId: "88450807700",
    appId: "1:88450807700:web:55ac13e9eb8e2d6436c181",
    measurementId: "G-1PWVW8H8J8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


document.getElementById('form1').addEventListener('submit', function (e) {
    e.preventDefault();

    nameHTML = document.getElementById('formName');
    idadeHTML = document.getElementById('formIdade');

    firebase.database().ref('vitelaCarneBovina').push({
        Alimento: nameHTML.value,
        Calorias: idadeHTML.value
    });
    nameHTML.value = '';
    idadeHTML.value = '';
});

//Render

(() => {
    firebase.database().ref('vitelaCarneBovina').on('value', function (snapshot) {
        var table = document.getElementById('tablenames');
        table.innerHTML = '';
        var data = snapshot.val();
        var con = 0;
        for (const key in data) {
            table.innerHTML += `
            <tr>
            <th scope="row ">
                ${con + 1}
            </th>
            <div>
            <td>${data[key].Alimento}</td>
            </div>
            <div>
            <td><b><i>${data[key].Calorias} cal.</i></b></td> 
            </div>
            </tr>   
            `;
            con++;
        }
    });

    let filterInput = document.getElementById('filter');
    filterInput.addEventListener('keyup', function () {
        let filterValue = document.getElementById('filter').value;
        var table = document.getElementById('tablenames');
        let tr = table.querySelectorAll('tr');

        for (let index = 0; index < tr.length; index++) {
            let val = tr[index].getElementsByTagName('td')[0];
            if (val.innerHTML.indexOf(filterValue) > -1) {
                tr[index].style.display = '';
            } else {
                tr[index].style.display = 'none';
            }

        }
    });

})();
///////////FUNÇÃO PARA DEIXAR A PRIMEIRA LETRA MAIUSCULA

var ignorar = ["das", "dos", "e", "é", "do", "da", "de"];

function caixaAlta(string) {
    return String(string).toLowerCase().replace(/([^A-zÀ-ú]?)([A-zÀ-ú]+)/g, function (match, separator, word) {
        if (ignorar.indexOf(word) != -1) return separator + word;
        return separator + word.charAt(0).toUpperCase() + word.slice(1);
    });
}

function corrigirValor(el) {
    el.value = caixaAlta(el.value);
}

///////////////////DESABILITA COLAR
$(document).ready(function() {

    $("#filter").bind('paste', function(e) {
        e.preventDefault();
    });

});
////////////////////SOMENTE TEXTO
$('#filter').keypress(function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which); // Variar a chamada do keyCode de acordo com o ambiente.
    if (keyCode > 47 && keyCode < 58) {
      e.preventDefault();
    }
  });