require('dotenv').config()
const { sequelize } = require('./config/db')

sequelize.authenticate()
  .then(() => {
    //Database connected successfully
    console.log('Connection has been established successfully.')

    const express = require('express')
    const handlebars = require('express-handlebars');
    const path = require('path')
    const morgan = require('morgan')
    const methodOverride = require('method-override')
    const app = express()
    const port = 3000

    const route = require('./routes')

    // Static file
    app.use(express.static(path.join(__dirname, 'public')))

    // HTTP loggers
    app.use(morgan('combined'))

    //Method Override
    //app.use(methodOverride('_method'))

    // Template engine
    app.engine('hbs', handlebars({
      extname: '.hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'resources/views'))

    // Routing
    route(app)

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })