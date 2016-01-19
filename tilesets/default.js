

define({
0:{
	'Water': [[
		'AnimatedTile', [
			'water1.png', 
			'water2.png', 
			'water3.png', 
			'water4.png'],
			150
		],
		{
			randomIndex: true
		}
	],
	'Grass': [[
		'MultiTile', [
			'grass1.png',
			'grass2.png',
			'grass3.png',
			'grass4.png']
		],
		{
			buildable: true,
			randomIndex: true
		}
	],
	'Hill': [[
		'MultiTile', [
			'mountain1.png',
			'mountain2.png',
			'mountain3.png',
			'mountain4.png']
		],
		{
			buildable: false,
			randomIndex: true
		}
	]
},
1:{
	'Beach N': ['SpriteTile', 'water-grass-n.png'],
	'Beach NE': ['SpriteTile', 'water-grass-n-e.png'],
	'Beach NEW': ['SpriteTile', 'water-grass-n-e-w.png'],
	'Beach NES': ['SpriteTile', 'water-grass-n-e-s.png'],
	'Beach NSW': ['SpriteTile', 'water-grass-n-s-w.png'],
	'Beach NW': ['SpriteTile', 'water-grass-n-w.png'],
	'Beach E': ['SpriteTile', 'water-grass-e.png'],
	'Beach ES': ['SpriteTile', 'water-grass-e-s.png'],
	'Beach ESW': ['SpriteTile', 'water-grass-e-s-w.png'],
	'Beach S': ['SpriteTile', 'water-grass-s.png'],
	'Beach SW': ['SpriteTile', 'water-grass-s-w.png'],
	'Beach W': ['SpriteTile', 'water-grass-w.png']
},
2:{
	'Clay Pit': [['SpriteTile', 'res_clay.png'], {buildOn: 'Grass'}],
	'Copper Ore': [['SpriteTile', 'res_copper.png'], {buildOn: 'Grass'}],
	'Iron Ore': [['SpriteTile', 'res_iron.png'], {buildOn: 'Grass'}],
	'Tin Ore': [['SpriteTile', 'res_tin.png'], {buildOn: 'Grass'}],
	'Corn Field': [[
		'MultiTile', [
			'res_corn1.png',
			'res_corn2.png',
			'res_corn3.png',
			'res_corn4.png'
		]],
		{
			buildOn: 'Grass',
			progressiveIndex: true
		}
	],
	'Potato Field': [[
		'MultiTile', [
			'res_potato1.png',
			'res_potato2.png',
			'res_potato3.png'
		]],
		{
			buildOn: 'Grass',
			progressiveIndex: true
		}
	],
	'Tree': [[
		'MultiTile', [
			'res_tree01.png',
			'res_tree02.png',
			'res_tree03.png',
			'res_stump.png'
		]],
		{
			buildOn: 'Grass',
			randomIndex: true
		}
	],
	'Campfire': [[
		'AnimatedTile', [
			'str_campfire01.png',
			'str_campfire02.png',
			'str_campfire03.png',
			'str_campfire04.png'
		],
		150],
		{
			buildOn: 'Grass'
		}
	],
	'Stone': [[
		'MultiTile', [
			'res_stone1.png',
			'res_stone2.png'
		]],
		{
			buildOn: 'Grass',
			randomIndex: true
		}
	],
	'Fish': [[
		'AnimatedTile', [
			'res_fish01.png',
			'res_fish02.png',
			'res_fish03.png',
			'res_fish04.png'
		],
		150],
		{
			buildOn: 'Water'
		}
	]
}
});