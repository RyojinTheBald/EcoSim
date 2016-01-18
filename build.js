({
  baseUrl: 'js',

  out: 'release/js/main.js',
  optimize: 'uglify2',

  name: 'main',
  wrap: false,

  paths: {
  	'../maps': 'empty:',
  	'../tilesets': 'empty'
  }

})