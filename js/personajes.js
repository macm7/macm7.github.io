$(document).ready(function () {
    
        $(function () {
            cargarPersonas('https://swapi.co/api/people/');
        });
    
        function cargarEspecie(url) {
            var nombreEspecie = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    nombreEspecie = data.name;
                }
                ,
                error: function (e) {
                    console.log(e);
                }
            });
            return nombreEspecie;
        }
    
        function cargarPlaneta(url) {
            var nombrePlaneta = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    nombrePlaneta = data.name;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return nombrePlaneta;
        }
    
        function cargarIdioma(url) {
            var nombreIdioma = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    nombreIdioma = data.language;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return nombreIdioma;
        }
    
        function cargarPelicula(url) {
            var nombrePelicula = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    nombrePelicula = data.title;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return nombrePelicula;
        }
    
        function cargarID(url) {
            var ID = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    ID = data.episode_id;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return ID;
        }
    
        function cargarClasif(url) {
            var nombreClasif = '';
            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function (data) {
                    nombreClasif = data.classification;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return nombreClasif;
        }
    
        function cargarPersonas(url) {
    
            $.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    $('#personajes').empty();
                    var personajes = document.getElementById('personajes');
                    var especie = '';
                    var clasificacion = '';
                    var pelicula = '';
                    var tarjeta = '';
                    var cont = 1;
                    for (var i = 0; i < data.results.length; i++) {
                        tarjeta += '<tr class="menu-tabla">';
                        tarjeta += '  <th scope="row">' + cont++ + '</th>';
                        tarjeta += '   <td>' + data.results[i].name + '</td>';
    
                        for (var j = 0; j < data.results[i].species.length; j++) {
                            especie = cargarEspecie(data.results[i].species[j]);
                            clasificacion = cargarClasif(data.results[i].species[j]);
                            tarjeta += '   <td>' + especie + ' / '+ clasificacion +'</td>';
                        }
    
                        tarjeta += '   <td>' + cargarPlaneta(data.results[i].homeworld) + '</td>';
                        tarjeta += '   <td>' + cargarIdioma(data.results[i].species) + '</td>';
                        tarjeta += '   <td>';
                        for (var j = 0; j < data.results[i].films.length; j++) {
                            pelicula = 'Episodio ' + cargarID(data.results[i].films[j]) + ': ' + cargarPelicula(data.results[i].films[j]) + '.<br> ';
                            tarjeta += pelicula;
                        }
    
                        tarjeta += '   </td>';
                        tarjeta += ' </tr>';
                    }
                    $('#personajes').html(tarjeta);
                    $('#next').on('click', function (e) {
                        e.preventDefault();
                        if (data.next != null)
                            cargarPersonas(data.next);
                    });
                    $('#prev').on('click', function (e) {
                        e.preventDefault();
                        if (data.previous != null)
                            cargarPersonas(data.previous);
                    });
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });