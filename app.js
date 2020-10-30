/**********************************************
Static Node.js and Express Portfolio Site
Developed by: James Estrada 
***********************************************/

// Import express and set up
const express = require('express');
const app = express();
const {projects} = require('./data.json');


// Setting view engine and static middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Index route
app.get('/', (req, res) => {
    // res.locals.data = projects;
    res.render('index', {projects});
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Project route
app.get('/project/:id', (req, res, next) => {
    const {id} = req.params;
    const project = projects[id];
    if (projects[id]) {
        res.render('project', {project});
      } else { 
        // Create error and pass it to the global error handler.
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project you requested doesn't exist.`
        next(err);
      }
    
});

/* Uncomment the following to intentionally throw a 500 server error */
// app.get('/error', (req, res, next) => {
//     const err = new Error();
//     err.message = `Custom 500 error thrown`;
//     err.status = 500;
//     throw err;
// });

/*
* 404 and Global Error Handlers
*/

/* 404 handler to catch undefined or non-existent route requests */ 
app.use((req, res, next) => {
    const err = new Error();
    err.message = `Oops! It looks like the page you're looking for does not exist.`;
    err.status = 404;
    // res.status(404).render('page-not-found');
    
    // log error's message and status properties
    console.log(`${err.message} ${err.status} error.`);

    res.render('page-not-found');
});
  
  /* Global error handler */
app.use((err, req, res, next) => {
    // Set response status to 404 and render 'page-not-found' if error's status is 404. Else set error message and status to the given one or assign a default one & render 'error' view.
    if (err.status === 404) {
        // res.status(404).render('page-not-found', {err});
        res.status = 404;
        console.log(`${err.message} ${err.status} error.`);
        res.render('page-not-found', {err});
    } else {
        err.message = err.message || 'Oops! It looks like something went wrong on the server.';
        res.status(err.status || 500) //.render('error', {err});
        console.log(`${err.message} ${res.status} error.`);
        res.render('error', {err});
    }
});


// Turn on express server
app.listen(3000, () => console.log('Server listening on port 3000'));