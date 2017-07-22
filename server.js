const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(morgan());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/css', express.static(__dirname+'/public/css'));
app.use('/js', express.static(__dirname+'/public/js'));
app.use('/assets', express.static(__dirname+'/public/assets'));
app.use('/', function(req, res){
  // res.sendfile('public/index.html');
  res.sendFile(__dirname+'/public/index.html');
})

// app.use(express.static('public'));

// app.get('/', (req, res, next)=>{
//   res.send('hello world');
// });

server.lastPlayerId = 0;


// app.use('/', (req,res,next)=>{
//   res.sendStatus(404);
// });

app.listen(port, ()=>{
  console.log('listening on ', port);
});





io.on('connection',function(socket){
  socket.on('newTank', function(){
    console.log('newTank');
    socket.tank = {
      id: server.lastPlayerId++,
      x: 300,
      y: 300
    }
    socket.emit('allplayers',getAllPlayers());
    socket.broadcast.emit('newTank',socket.player);
  });
  socket.on('test', function(){
    console.log('test received');
  })
});
