const api = require("../services/weatherService.js")

var categoryByTemp = require('../util/category')

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'Seu client id',
    clientSecret: 'Seu client secret',
    redirectUri: 'http://localhost:3001/callback'
  });


spotifyApi.setAccessToken('O seu Token de acesso');

var temp = '';

module.exports = {
    
    async index(req,res){

        const {city, lat, lon} = req.body

        if (!city || city == null) {

            // se não existe nome da cidade, verifica se possui as coordenadas, caso não possua tb
            // retorna uma mensagem de erro
            if( !lat || lat == null || !lon || lon == null ){

                return res.status(400).json("Favor digitar o nome da cidade ou suas coordenadas")
           
            // possuindo as coordenadas ( e não o nome da cidade), faz a requisição a API
            }else{
            
                try {
                    const response = await api.get(`weather?lat=${lat}&lon=${lon}
                    &appid=0d40495944faed2513e634689428d6b8`)                       //consulta API  
                    
                    //Transformei o resultado da API( que está em Kelvin) em Celsius
                    temp = response.data.main.tem - 273,15        

                    // Utilizei a biblioteca spotify web api node para fazer a consulta ao spotify

                    // A função categoryByTemp retorna uma das 4 categorias ( Pop,Rock,Clássico, Party)
                    // a partir da temperatura da cidade

                    spotifyApi.getPlaylistsForCategory(categoryByTemp(temp), {
                        country: 'BR',
                        limit : 2,
                        offset : 0
                      })
                    .then(function(data) {
                      res.json(data.body.playlists.items)
                    }, function(err) {
                      console.log("Something went wrong!", err);
                    });
                } catch (error) {
                    console.log(error)
                }
            }

        }else{
            //caso possua o nome da ciadade, faz a requisiçao a API
            try {
                const response = await api.get(`weather?q=${city} 
                &appid=0d40495944faed2513e634689428d6b8`)               

                temp = response.data.main.temp - 273,15

                spotifyApi.getPlaylistsForCategory(categoryByTemp(temp), {
                    country: 'BR',
                    limit : 2,
                    offset : 0
                  })
                .then(function(data) {
                  res.json(data.body)
                }, function(err) {
                  console.log("Something went wrong!", err);
                });

                
            } catch (error) {
                console.log(error)
            }
            
        }
      
    }
}




