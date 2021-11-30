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
    // const methodOverride = require('method-override')

    const app = express()
    //const port = 3000
    const PORT = process.env.PORT || 3000; //PORT to deploy in heroku


    const route = require('./routes')

    // Static file
    app.use(express.static(path.join(__dirname, 'public')))

    // HTTP loggers
    app.use(morgan('combined'))

    //Method Override
    //app.use(methodOverride('_method'))

    //Middleware to get <form> data
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // Template engine
    app.engine('hbs', handlebars({
      extname: '.hbs',
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'resources/views'))

    // Handlebars register
    let hbs = handlebars.create({});
    // Keep selected value in pagination
    hbs.handlebars.registerHelper('select', function (selected, options) {
      return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    });

    // Routing
    route(app)

    //app.listen(port, () => {
    //  console.log(`Example app listening at http://localhost:${port}`)
    //})
  
    app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
    });

  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })

