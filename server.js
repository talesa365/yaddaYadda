const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const PORT = 8000;
const path = require('path');
const globals = require('./DB');
const UserRoute = require('./routes/users.route');
const AdminRoute = require('./routes/admin.route')
mongoose.Promise = global.Promise;
const publicRoot = path.join(__dirname, 'public');
mongoose.connect(globals.DB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('connected to our database')
})

app.use(express.static(publicRoot));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/users', UserRoute)
app.use('/admin', AdminRoute)
// serving static files ---------->
app.get("/", (req, res) => {
    res.sendFile(publicRoot + './index.html')
} );
app.get('/admin', (req, res) => {
    res.sendFile(publicRoot + '/admin/admin.html')
});
app.get('/*', (req, res) => {
    res.sendFile(publicRoot + '/404.html')
});
app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})