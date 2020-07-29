function addScoreTable(res) {
    $('#score-tbody').empty();
    for (var i = 0; i < res.length; i++) {
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

$('#reset-btn').click(() => {
    console.log('reset btn is clicked');

    $.ajax({
        type: 'GET',
        url: '/db/reset',
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res);

            addScoreTable(res);

        }
    });

})

function searchName(name) {
    $.ajax({
        type: 'POST',
        url: '/db/search',
        data: {
            name
        },
        error: function (xhr) {
            console.log('Oops, something went wrong.');
        },
        success: function (res) {
            console.log(res);

            addScoreTable(res);

        }
    });

}

$('#search-btn').click(() => {
    console.log('search btn is clicked, name is ' + $('#search-name').val());

    searchName($('#search-name').val());

})

$('#search-name').keypress((event) => {
    if (event.keyCode == 13) {
        searchName($('#search-name').val());
    }
})

$('#search-name').on('keyup blur', function () {
    console.log($(this).val());

    $('#search-sql').val("SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = '" + $(this).val() + "'");
})

$('#game-start').click(() => {
    $('#game-start').addClass('active');
})