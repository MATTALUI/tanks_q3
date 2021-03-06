const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/css', express.static(__dirname+'/public/css'));
app.use('/js', express.static(__dirname+'/public/js'));
app.use('/assets', express.static(__dirname+'/public/assets'));
app.use('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
})

let tanks = [];
let indexToUse = 0;
let startPos = [{
      pos: 1,
      x: 325,
      y: 175},
    {
      pos:2,
      x: 975,
      y: 525
    },{
      pos: 3,
      x: 325,
      y: 525
    },{
      pos: 4,
      x: 975,
      y: 175
    },{
      pos: 5,
      x: 650,
      y: 350
    }]

io.on('connection', function(socket){
  socket.on('addPlayer', function(selections){
    // for (let i = 0; i<tanks.length; i++){
    //   if (tanks[i].id === socket.id){
    //     tanks[i].x = startPos[indexToUse].x;
    //     tanks[i].y = startPos[indexToUse].y;
    //     tanks[i].color = selections.color;
    //     tanks[i].name = selections.name;
    //     socket.emit('allPrev', tanks.filter((tank)=>{return tank.id!=socket.id}));
    //     socket.emit('addTank', tanks[i]);
    //     socket.broadcast.emit('newBaddy', tanks[i]);
    //     return;
    //   }
    // }
    console.log('no tank found');
    let x;
    let y;
    let newPlayer = {
      x:startPos[indexToUse].x,
      y:startPos[indexToUse].y,
      id: socket.id,
      color: selections.color,
      name: selections.name
    }
    indexToUse++;
    indexToUse===5?indexToUse=0:null;
    socket.emit('allPrev', tanks)
    tanks.push(newPlayer);
    console.log(tanks);
    socket.emit('addTank', newPlayer);
    socket.broadcast.emit('newBaddy', newPlayer);
  });
  socket.on('disconnect', function(){
    socket.broadcast.emit('quitter', socket.id);
    for(let i =0; i<tanks.length; i++){
      if (tanks[i].id === socket.id){
        tanks.splice(i,1);
      }
    }
    console.log(tanks);
  })
  socket.on('allPlayers', function(){
    tanks.filter
  });
  socket.on('moveStream', function(info){
    tanks.forEach((tank)=>{
      if(tank.id===info.id){
        tank.x = info.x;
        tank.y = info.y;
      }
    });
      socket.broadcast.emit('moveStream', info);
  });
  socket.on('shootStream', function(info){
    socket.broadcast.emit('shootStream', info);
  });
  socket.on('deathStream', function(info){
    for(let i = 0;i< tanks.length;i++){
      if (tanks[i].id === info.death){
        tanks.splice(i,1);
      }
    }
    socket.broadcast.emit('deathStream', info);
  });
  socket.on('bonusHealthStream', function(info){
    socket.broadcast.emit('bonusHealthStream', info);
  });
});

if (process.env.NODE_ENV !== 'production') {
  server.listen(port,'10.9.23.162', ()=>{
    console.log('listening on ', '10.9.23.162:'+port);
  });
} else{
  server.listen(port,()=>{
    console.log('listening on ', port);
  });
}
