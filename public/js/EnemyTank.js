TanksGame.EnemyTank = function (x,y,id) {
  this.id = id;
  enemyTank = game.add.sprite(x, y, 'redTank');
  enemyTank.anchor.setTo(0.5, 0.5);
  enemyTank.id = id;

  enemyTurret = game.add.sprite(x, y, 'redTurret', 'redTank');
  enemyTurret.anchor.setTo(0.5, 0.6);
  enemyTurret.id = id;


  game.physics.enable(enemyTank, Phaser.Physics.ARCADE);


}

TanksGame.EnemyTank.prototype.update =  ()=> {

}
