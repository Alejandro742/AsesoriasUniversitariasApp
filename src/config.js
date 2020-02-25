const path = require('path');

module.exports = {
    api:{
        port: process.env.API_PORT || 3000, 
    },
    hbs:{
        defaLay:'main',
        dir: path.join(__dirname,'views'),
    }
}