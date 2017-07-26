var Client = {};
Client.socket = io.connect();

Client.socket.on('addTank', function({x,y,id,color}){
  TanksGame.Play.prototype.addMe(x,y,id,color);
});
Client.socket.on('newBaddy', function({x,y,id,color}){
  if(game.state.current==='Play'){
    TanksGame.Play.prototype.addFoe(x,y,id,color);
  }
});
Client.socket.on('allPrev', function(data){
  data.forEach((tank)=>{TanksGame.Play.prototype.addFoe(tank.x,tank.y,tank.id,tank.color);})
});
Client.socket.on('moveStream', function({x,y,id,tankAngle,turretAngle}){
  game.world.children.forEach((sprite)=>{

    if(sprite.id === id && sprite.key.indexOf('Tank') >-1){
      sprite.x = x;
      sprite.y = y;
      sprite.angle = tankAngle;
    }else if (sprite.id === id &&sprite.key.indexOf('Turret')>-1){
      sprite.x = x;
      sprite.y = y;
      sprite.angle = turretAngle;
    }
  })
});
Client.socket.on('shootStream', function(info){
  TanksGame.EnemyBullet.prototype.update(info)
});
Client.socket.on('quitter', function(info){
  TanksGame.Play.prototype.destroyTheWeak(info);
});
Client.addPlayer = function(color){
  Client.socket.emit('addPlayer', color);
}
