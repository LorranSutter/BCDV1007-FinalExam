$(document).ready(function () {

    let pokedexList = $('#pokedex-list');

    function includePokemon(pokemon) {
        let _id = pokemon._id;

        let ul = document.createElement('ul');
        ul.id = _id;

        pokedexList.append(ul);

        let pokemonList = $(`ul#${_id}`);
        pokemonList.append(`<li id='li-name-${_id}'>Name: ${pokemon.name}</li>`);
        pokemonList.append(`<li id='li-height-${_id}'>Height: ${pokemon.height}</li>`);
        pokemonList.append(`<li id='li-weight-${_id}'>Weight: ${pokemon.weight}</li>`);
        pokemonList.append(`<li id='li-image-${_id}'><img src="${pokemon.image}" alt="${pokemon.name}"></li>`);

        let button = document.createElement('button');
        button.id = _id;
        button.name = `${pokemon.name}`;
        button.value = `${pokemon.name}`;
        button.addEventListener('click', deletePokemon);
        button.innerText = 'x';

        $(`#li-image-${_id}`).append(button);
    }
    
    function deletePokemon(e) {
        let id = e.target.id;
        $.ajax({
            url: '/api/pokedex',
            type: 'DELETE',
            data: {_id: id},
        }).done(function (data, status, req) {
            $(`ul#${id}`).remove();
        }).fail(function (req, status, err) {
            console.log(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })         
    }


    $.get('/api/pokedex')
        .done((data) => {
            console.log(data);
            for(pokemon of data) {
                includePokemon(pokemon)
        }
    })
    .fail(function() {
        console.log(err)
    });


    function postPokemon() {
        let data = {
            name : $("#name").val(),
            height : $("#height").val(),
            weight : $("#weight").val(),
            image : $("#image").val()
        }
        $.post('/api/pokedex', data)
         .done((data) => {
            // includePokemon(data);
         })
         .fail(function(err) {
             console.log(err)
        });
    }

    document.getElementById('submit').addEventListener('click', postPokemon);

});