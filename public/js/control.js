$('#reset-btn').click(() => {
    console.log('reset btn is clicked');

    $.ajax({
        type: 'GET',
        url: '/db/reset',
        error: function (xhr) {},
        success: function (res) {
            console.log(res);
            console.log(res.length);

            $('#score-tbody').empty();
            for (var i = 0; i < res.length; i++){
                $('#score-tbody').append(`
                    <tr>
                        <td>
                            ${res[i].id}
                        </td>
                        <td>
                            ${res[i].class}
                        </td>
                        <td>
                            ${res[i].name}
                        </td>
                        <td>
                            ${res[i].score}
                        </td>
                    </tr>
                `);

            }
        }
    });

})

$('#search-btn').click(() => {
    console.log('search btn is clicked, name is ' + $('#search-name').val());

})

$('#search-name').on('keyup blur', function() {
    console.log($(this).val());
    
    $('#search-sql').val("SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = '" + $(this).val() + "'");
})