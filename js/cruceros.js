$(document).ready(function () {

    $(function () {
        cargarCruceros('https://swapi.co/api/starships/');
    });
    function cargarCruceros(url) {

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                $('#cruceros').empty();
                var cruceros = document.getElementById('cruceros');
                var tarjeta = '';
                var cont = 1;
                for (var i = 0; i < data.results.length; i++) {
                    tarjeta += '<tr class="menu-tabla">';
                    tarjeta += '  <th scope="row">' + cont++ + '</th>';
                    tarjeta += '   <td>' + data.results[i].name + '</td>';
                    tarjeta += '   <td>' + data.results[i].model + '</td>';
                    tarjeta += '   <td>' + data.results[i].manufacturer + '</td>';
                    tarjeta += '   <td>' + data.results[i].crew + '</td>';
                    tarjeta += '   <td>' + data.results[i].passengers + '</td>';
                    tarjeta += ' </tr>';

                }
                $('#cruceros').html(tarjeta);
                $('#next').on('click', function (e) {
                    e.preventDefault();
                    if (data.next != null)
                        cargarCruceros(data.next);
                });
                $('#prev').on('click', function (e) {
                    e.preventDefault();
                    if (data.previous != null)
                        cargarCruceros(data.previous);
                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
});