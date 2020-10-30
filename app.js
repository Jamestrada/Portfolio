/**********************************************
Static Node.js and Express Portfolio Site
Developed by: James Estrada 
***********************************************/

// Import express and set up
const express = require('express');
const app = express();
const {projects} = require('./data.json');


// Setting middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Index route
app.get('/', (req, res) => {
    res.locals.data = projects;
    res.render('index');
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Project route
app.get('/project/:id', (req, res) => {
    const {id} = req.params;
    const project = projects[id];
    res.render('project', {project});
});


// Turn on express server
app.listen(3000, () => console.log('Server listening on port 3000'));