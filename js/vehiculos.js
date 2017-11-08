$(document).ready(function () {

    $(function () {
        cargarVehiculos('https://swapi.co/api/vehicles/');
    });
    function cargarVehiculos(url) {

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                $('#vehiculos').empty();
                var vehiculos = document.getElementById('vehiculos');
                var tarjeta = '';
                var cont = 1;
                for (var i = 0; i < data.results.length; i++) {
                    tarjeta += '<tr class="menu-tabla">';
                    tarjeta += '  <th scope="row">' + cont++ + '</th>';
                    tarjeta += '   <td>' + data.results[i].name + '</td>';
                    tarjeta += '   <td>' + data.results[i].model + '</td>';
                    tarjeta += '   <td>' + data.results[i].length + '</td>';
                    tarjeta += '   <td>' + data.results[i].crew + '</td>';
                    tarjeta += '   <td>' + data.results[i].passengers + '</td>';
                    tarjeta += '   <td>' + data.results[i].vehicle_class + '</td>';
                    tarjeta += ' </tr>';
                }
                $('#vehiculos').html(tarjeta);
                $('#next').on('click', function (e) {
                    e.preventDefault();
                    if (data.next != null)
                        cargarVehiculos(data.next);
                });
                $('#prev').on('click', function (e) {
                    e.preventDefault();
                    if (data.previous != null)
                        cargarVehiculos(data.previous);
                });
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
});