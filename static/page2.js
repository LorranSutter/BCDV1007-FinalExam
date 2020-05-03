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
            data: { _id: id },
            beforeSend: () => $('.loading').show()
        }).done(function (data, status, req) {
            $(`ul#${id}`).remove();
            $('.loading').hide();
        }).fail(function (req, status, err) {
            console.log(`Oh uh! Something went wrong. Got status: ${status}\nwith error: ${err}`);
        })
    }


    $.get('/api/pokedex')
        .done((data) => {
            for (pokemon of data) {
                includePokemon(pokemon);
            }
        })
        .fail(function () {
            console.log(err)
        });


    function postPokemon() {
        let name = $("#name").val();
        let height = $("#height").val();
        let weight = $("#weight").val();
        let image = $("#image").val();

        if (name === "" && height === "" && weight === "" && image === "") return

        $("#height").css('border', '1px solid gray');
        $("#weight").css('border', '1px solid gray');

        let heightInt = height !== "" && !Number.isInteger(parseInt(height));
        let weightInt = weight !== "" && !Number.isInteger(parseInt(weight));

        if (heightInt) $("#height").css('border', '1px solid red');
        if (weightInt) $("#weight").css('border', '1px solid red');
        if (heightInt || weightInt) return;

        let pokemon = { name, height, weight, image }

        $("#name").val("");
        $("#height").val("");
        $("#weight").val("");
        $("#image").val("");

        $('.loading').show();
        
        $.post('/api/pokedex', pokemon)
            .done((data) => {
                includePokemon(pokemon);
                $('.loading').hide();
            })
            .fail(function (err) {
                console.log(err)
            });
    }

    document.getElementById('submit').addEventListener('click', postPokemon);

});