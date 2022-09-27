const express = require("express");
const router = express.Router();
const axios = require("axios");
// const Country = require("../models/Country");
const {Country, Activities } = require("../db")


const getApiInfo = async () => {
    const apiUrl = await axios.get("https://restcountries.com/v3/all") //hago el pedido a la api
    const apiInfo = await apiUrl.data.map((e) => {
       return {
           id: e.cca3,
           name: e.name.official,
           flagImg: e.flags[1],// averiguar/preguntar acerca de si hace falta verificacion aca
           continent: e.continents[0],
           capital: e.capital?e.capital[0]: "capital not found",
           subRegion: e.subregion,
           area: e.area,
           population: e.population
           
        };//me traigo solo los daots que necesito
        
    })
    
    return apiInfo; //retorno un array con la info
};

const getDbInfo = async () => {
    return await Country.findAll({
        include:{
            model: Activities,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes: []
            }
        }
    })
};


const getAllCountries = async () => {
    const apiInfo = await getApiInfo(); //son arrays
    const dbInfo = await getDbInfo();// son arrays
    const totalInfo = dbInfo.concat(apiInfo)
    return totalInfo;
}



router.get("/", async (req, res) => {
    let allCountries = await Country.findAll({include:Activities})// me busco todos los paises en la db
    const {name} = req.query;
    
    if(!allCountries.length){// si no tiene length no existe ningun pais por ende los creo
         allCountries = await getApiInfo(); //reasigno el valor de allcountries para que tenga los datos de la api
        await Country.bulkCreate(allCountries)//creo todos los paises en la db
        // res.json(allCountries)
    }

    if(name){// pregunto si vinene el name
        const fillCountry = allCountries.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));// si vinene lo filtro
        if(fillCountry.length > 0){//si es mayot a 0 es que existe
            return res.status(200).json(fillCountry)// si existe lo devuelvo
        }else{
            return res.status(400).json({
                error: "Country not found"
            })
        }
    }

   
    res.status(200).json(allCountries)
    
    
});


router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const country = await Country.findOne({
            where: {
                id: id.toUpperCase()
            }, 
            include: [{ 
                model: Activities,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
          })
          if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("Country not found");
        } 
    } catch (error) {
        console.log(error)
    }
});






module.exports = router;