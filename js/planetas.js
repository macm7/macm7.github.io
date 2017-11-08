$(document).ready(function () {

    $(function () {
        cargarPlanetas('https://swapi.co/api/planets/');
    });
    function cargarPlanetas(url) {

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                $('#planetas').empty();
                var planetas = document.getElementById('planetas');
                var tarjeta = '';
                var cont = 1;
                for (var i = 0; i < data.results.length; i++) {
                    tarjeta += '<tr class="menu-tabla">';
                    tarjeta += '  <th scope="row">' + cont++ + '</th>';
                    tarjeta += '   <td>' + data.results[i].name + '</td>';
                    tarjeta += '   <td>' + data.results[i].diameter + '</td>';
                    tarjeta += '   <td>' + data.results[i].climate + '</td>';
                    tarjeta += '   <td>' + data.results[i].terrain + '</td>';
                    tarjeta += '   <td>' + data.results[i].surface_water + '</td>';
                    tarjeta += '   <td>' + data.results[i].population + '</td>';
                    tarjeta += ' </tr>';
                }
                $('#planetas').html(tarjeta);
                $('#next').on('click', function (e) {
                    e.preventDefault();
                    if (data.next != null)
                        cargarPlanetas(data.next);
                });
                $('#prev').on('click', function (e) {
                    e.preventDefault();
                    if (data.previous != null)
                        cargarPlanetas(data.previous);
                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
});