$(document).ready(function () {
    let cassette_list = $('#cassette-list');

    function successfulDeleteHandler(data) {
        console.log(data);
		var selector = `button[id='${data._id}']`;
		var button = $(selector);
		var parent = button.parent();
		parent.remove()		
    }

    function deleteHandler(e) {
        let title = e.target.name;
        $.ajax(
            '/api/cassettes',
            {
                method: 'DELETE',
                success: successfulDeleteHandler,
                data: {_id: e.target.id, title: title}
            }
        )
    }

    // $.get('/api/cassettes')
    //  .done(function(data) {
    //      for(cassette of data) {
    //          let _id = cassette._id;
    //          cassette_list.append(`<li id='li-${_id}'>${cassette.title}</li>`);

    //          let button = document.createElement('button');
    //          button.id = _id;
    //          button.name = `${cassette.title}`;
    //          button.value = `${cassette.title}`;
    //          button.addEventListener('click', deleteHandler);
    //          button.innerText = 'x';

    //          $(`#li-${_id}`).append(button);
    //      }
    //  })
    //  .fail(function() {
    //      alert('Error!');
    //  });

     $('#submit').on('click', function(e){
        let input = {
            name : $("#name"),
            height : $("#height"),
            weight : $("#weight"),
            image : $("#image")
        }
        $.ajax({
            type: "POST",
            url: '/api/pokedex',
            data: input,
            // success: success,
            // dataType: dataType
          });
        // $.post('/api/pokedex', input)
        // // $.get('/api/pokedex')
        //  .done(function (data, status, req) {
        //     // console.log(`Added: ${input} to the collection!`);
        //     // console.log(data);
        //     // console.log(input);
        //     // buildListItem(input.val());
        //     // input.val('');
        // }
        // ).fail(function (req, status, err) {
        //     alert(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        // })
    })
});