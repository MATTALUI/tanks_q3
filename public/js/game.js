  const splode = new Audio('/assets/splosion.wav');
  const hit = new Audio('/assets/hit1.wav');
  var splashed = false;

  game.state.add('Boot', TanksGame.Boot);
  game.state.add('Splash', TanksGame.Splash)
  game.state.add('Menu', TanksGame.Menu);
  game.state.add('Play', TanksGame.Play);
  game.state.add('GameOver', TanksGame.GameOver);
  game.state.add('Controls', TanksGame.Controls);
  game.state.start('Boot');
