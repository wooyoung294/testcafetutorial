const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {exec} = require('child_process');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'reports'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'reports')));
app.use(express.static(path.join(__dirname, 'cucumber-json-reports')));
app.use('/', indexRouter);
app.get('/test', async function (req, res) {
    console.log('req',req.query.testScript);
    await exec(`npm run ${req.query.testScript+req.query.browser}`, (error, stdout, stderr) => {

        exec('npm run report', (error, stdout, stderr) => {
            if (error) {
                res.send(`Error: ${error.message}`);
            } else {
                res.send('SUCCESS');
            }
        });

    });
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;