const NEWS_API_KEY = process.env.NEWS_API_KEY;
const axios = require("axios");
const usersModel = require("../models/usersModel");

const getNews = async(req, res) =>{
    const email = req.verifiedToken.email;
    // const user = req.app.locals.users.find(user => user.email === email);
    const body = { email: email};
    const user = await usersModel.findOne(body);
    try{
        const response = await axios.get("https://newsapi.org/v2/top-headlines?", {
            params: {
                category: user.preferences,
            },
            headers: {
                "X-Api-Key": NEWS_API_KEY,
            }
        });
        return res.status(200).json({news: response.data})
    }catch(error){
        return res.status(500).json({error: "Error fetching data from external API."})
    }
}

module.exports = {getNews};