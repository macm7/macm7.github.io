$(document).ready(function () {
    var root = 'https://swapi.co/api/films/';

    //FILMS
    //Metodo 1
    $.ajax({
        url: root,
        method: 'GET',
    }).then(function (data) {
        //console.log(data);
        var tarjeta = '';
        for (var i = 0; i < data.results.length; i++) {
            tarjeta += '<div class="col-md-4">'
            tarjeta += '  <h1>' + data.results[i].tittle + '</h1>'
            tarjeta += '</div>'
        }
        //console.log(tarjeta);
        $('#peliculas').html(tarjeta);
    });




    //Metodo 2 

    $.ajax({
        url: root,
        method: 'GET',
        success: function (data) {
            //console.log(data);
            var tarjeta = '';
            for (var i = 0; i < data.results.length; i++) {
                tarjeta += '<div class="col-md-4">'
                tarjeta += '  <h1>' + data.results[i].tittle + '</h1>'
                tarjeta += '</div>'
            }
            //console.log(tarjeta);
            $('#peliculas').html(tarjeta);
        },
        error: function (e) {
            console.log(e);
        }
    });


    //PERSONAJES

    var root = 'https://swapi.co/api/people/';
    cargarPersonajes(root);
    function cargarPersonajes(url) {

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                $('#personajes').empty();
                var listado = document.getElementById('personajes');
                for (var i = 0; i < data.results.length; i++) {
                    var texto = document.createTextNode(data.results[i].name);
                    var elemLI = document.createElement("LI");
                    elemLI.appendChild(texto)
                    listado.appendChild(elemLI);
                }
                $('#next').on('click', function (e) {
                    e.preventDefault();
                    if (data.next != null)
                        cargarPersonajes(data.next);
                });
                $('#prev').on('click', function (e) {
                    e.preventDefault();
                    if (data.previous != null)
                        cargarPersonajes(data.previous);
                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
});

