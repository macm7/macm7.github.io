$(document).ready(function () {
    $(function () {
        cargarPeliculas('https://swapi.co/api/films/');
    });


    function cargaPersonaje(url) {
        var nombrePersonaje = '';
        $.ajax({
            url: url,
            method: 'GET',
            async: false,
            success: function (data) {
                nombrePersonaje = data.name;
            }
            ,
            error: function (e) {
                console.log(e);
            }
        });
        return nombrePersonaje;
    }





    function cargarPeliculas(url) {
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                //console.log(data);
                var peliculas = document.getElementById("peliculas");
                $("#peliculas").empty();
                var personaje = '';
                var tarjeta = '';
                for (var i = 0; i < data.results.length; i++) {
                    tarjeta += '<div class="col-lg-4 col-sm-6 portfolio-item">';
                    tarjeta += '    <div class="card h-100">';
                    tarjeta += '        <img class="card-img-top" src="img/menu.jpg" alt="">';
                    tarjeta += '            <div class="card-body">';
                    tarjeta += '                <h4 class="card-title text-center">';
                    tarjeta += '                    <p id="titulo-menu">' + data.results[i].title + '</p>';
                    tarjeta += '                </h4>';
                    tarjeta += '                <p class="card-text">';
                    tarjeta += data.results[i].opening_crawl;
                    tarjeta += '                </p>';
                    for (var j = 0; j < data.results[i].characters.length; j++) {
                        personaje += cargaPersonaje(data.results[i].characters[j]) + ', ';
                    }
                    tarjeta += '<center><button type="button" class="btn btn-primary" id="detalle" data-synopsis="' + data.results[i].opening_crawl + ' <br><br> <strong>Director:</strong> ' + data.results[i].director + ' <br><br> <strong>Productor:</strong> ' + data.results[i].producer + ' <br><br> <strong>Fecha de Estreno:</strong> ' + data.results[i].release_date + ' <br><br> <strong>Personajes que aparecen:</strong> ' + personaje + '." data-title="Episodio: ' + data.results[i].episode_id + ' (' + data.results[i].title + ')" data-toggle="modal" data-target="#exampleModal">Detalle de la Pelicula</button></center>';
                    tarjeta += '            </div>';
                    tarjeta += '    </div>';
                    tarjeta += '</div>';
                }
                //console.log(tarjeta);
                $('#peliculas').html(tarjeta);
            },
            error: function (e) {
                console.log(e);
            }
        });
        $('#exampleModal').on('show.bs.modal', function (e) {
            $(this).find('.modal-title').html($(e.relatedTarget).data('title'));
            $(this).find('.modal-body').html($(e.relatedTarget).data('synopsis'));
        });
    }


});