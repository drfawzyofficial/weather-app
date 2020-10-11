// Express is a NodeJS Framework
const express = require('express');
const app = express();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
const cors = require('cors')
app.use(cors())

/*@ here we include third-party middleware => Morgan @*/
const morgan = require('morgan');
app.use(morgan('dev'));
/*@ here we include third-party middleware => Morgan @*/

// Include Packages
const chalk = require("chalk");


/*@ here we include static-files @*/
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
/*@ here we include static-files @*/

/*@ here we set-up body-parser @*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*@ here we set-up body-parser @*/

/*@ here we set-up template-engine @*/
app.set('view engine', 'ejs');
/*@ here we set-up template-engine @*/

// Here we include routes
const Index = require('./routes/Index')
app.use('/', Index)


/*@ Handle Error 404 not found @*/
app.use((req, res, next) => {
    res.render('error404');
    next();
});
/*@ Handle Error 404 not found @*/

/*@ here the server is running on port 3000 @*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Server is running on port-${port}`));
/*@ here the server is running on port 3000 @*/

// We will make an endpoint to receive the location with (lat & lng) to send request to the weather API for retrieving the weather details about this location
