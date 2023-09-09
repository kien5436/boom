const router = require('express').Router();

const getAssets = require('../middlewares/extract-assets');

router.get('/', getAssets('index'), (req, res, next) => {

  const assets = res.locals.assets;

  res.render('index', { ...assets, homepage: 'https://github.com/shhlkien/webpack-express-generator' });
});

router.get('/game', getAssets('game'), (req, res) => {

  const assets = res.locals.assets;
  assets.favicon = assets.others.find((i) => i.includes('favicon'));
  assets.gameBg = assets.others.find((i) => i.includes('stone-bg'));

  res.render('game', assets);
});

module.exports = router;