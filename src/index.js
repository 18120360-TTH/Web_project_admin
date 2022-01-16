require('dotenv').config()
const { sequelize } = require('./models')

sequelize.authenticate()
  .then(() => {
    //Database connected successfully
    console.log('Connection has been established successfully.')

    const express = require('express')
    const handlebars = require('express-handlebars');
    const path = require('path')
    const morgan = require('morgan')
    const passport = require('passport')
    const session = require('express-session')


    const app = express()
    const port = 3000


    const route = require('./routes')

    // Static file
    app.use(express.static(path.join(__dirname, 'public')))

    // HTTP loggers
    app.use(morgan('combined'))

    //Middleware to get <form> data
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // Authenticate initialize
    app.use(session({
      secret: 'my_secret',
      // resave: false,
      // saveUninitialized: true,
      // cookie: { secure: true }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    
    // Template engine
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, 'views'))

    
    // Handlebars register
    let hbs = handlebars.create({});
    // Keep selected value in pagination
    hbs.handlebars.registerHelper('select', function (selected, options) {
      return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
    });
    // Switch case helper
    hbs.handlebars.registerHelper('switch', function (value, options) {
      this.switch_value = value;
      return options.fn(this);
    });

    hbs.handlebars.registerHelper('case', function (value, options) {
      if (value == this.switch_value) {
        return options.fn(this);
      }
    });


    // Routing
    route(app)

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })

