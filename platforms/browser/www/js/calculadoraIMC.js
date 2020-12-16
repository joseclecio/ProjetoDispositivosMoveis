"use strict";

$('#peso').keyup(function (e) {
  reactiveCalc();
});

$('#altura').keyup(function (e) {
  reactiveCalc();
});

function reactiveCalc() {
  var pesoInput = $('#peso').val();
  var alturaInput = $('#altura').val();
  if (pesoInput && alturaInput) {
    var peso = parseFloat(pesoInput);
    var altura = parseFloat(alturaInput);
    var imc = calculeImc(peso, altura);
    $('#imc').text(imc.toFixed(2));
    setIMCStat(imc);
  }
}

function calculeImc(peso, altura) {
  if (!peso || !altura) {
    return 0;
  }
  return peso / (altura * altura);
}

function setIMCStat(imcValue) {
  $('#imc').removeClass();
  $('#imc').addClass('imc-field');

  var message = ''
  var imc = Math.round(imcValue * 100) / 100;
  if (imc < 18.5) {
    message = 'Baixo Peso';
    $('#imc').addClass('is-bad');
  } else if (imc >= 18.5 && imc < 25) {
    message = 'Peso Ideal';
    $('#imc').addClass('is-good');
  } else if (imc >= 25 && imc < 30) {
    message = 'Sobrepeso';
    $('#imc').addClass('is-worrying');
  } else if (imc >= 30 && imc < 35) {
    message = 'Obesidade grau 1';
    $('#imc').addClass('is-bad');
  } else if (imc >= 35 && imc < 40) {
    message = 'Obesidade grau 2';
    $('#imc').addClass('is-bad');
  } else if (imc > 40) {
    message = 'Obesidade grau 3';
    $('#imc').addClass('is-bad');
  } else {
    message = 'não encontrado';
  }
  
  $('#stat').text(message);
}