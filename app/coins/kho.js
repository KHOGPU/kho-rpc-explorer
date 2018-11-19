var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var khoCurrencyUnits = [
	{
		name:"KHO",
		multiplier:1,
		default:true,
		values:["", "kho", "KHO"],
		decimalPlaces:8
	},
	{
		name:"mKHO",
		multiplier:1000,
		values:["mkho"],
		decimalPlaces:5
	},
	{
		name:"μKHO",
		multiplier:1000000,
		values:["μkho"],
		decimalPlaces:2
	}
];

module.exports = {
	name:"Khorium",
	ticker:"KHO",
	logoUrl:"/img/logo/kho.svg",
	siteTitle:"Khorium Explorer",
	nodeTitle:"Khorium Full Node",
	nodeUrl:"https://khorium.org/",
	demoSiteUrl: "https://explorer.khorium.org",
	miningPoolsConfigUrls:[],
	maxBlockWeight: 4000000,
	currencyUnits:khoCurrencyUnits,
	currencyUnitsByName:{"KHO":khoCurrencyUnits[0], "mKHO":khoCurrencyUnits[1], "μKHO":khoCurrencyUnits[2]},
	baseCurrencyUnit:khoCurrencyUnits[2],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: "0000000039a01bf0a24d7caee86bd0e3666bf8498984bc170734860c9854ee03",
	genesisCoinbaseTransactionId: "4cdd04f307750477d1e024c79c6112e5a0644e55c4ced223b245070ec755b86d",
	genesisCoinbaseTransaction: {
		"txid": "4cdd04f307750477d1e024c79c6112e5a0644e55c4ced223b245070ec755b86d",
		"hash": "4cdd04f307750477d1e024c79c6112e5a0644e55c4ced223b245070ec755b86d",
		"size": 248,
		"vsize": 248,
		"version": 1,
		"confirmations":2272,
		"vin": [
			{
				"coinbase": "04ffff001d0104205365702033302c203230313820313a30333a353520504d202d20353433373432"
			}
		],
		"vout": [
			{
				"value": 50,
				"n": 0,
				"scriptPubKey": {
					"hex": "410470b6a2d4cd3abbe05f8a32b96e0d71b8c9009d860547c5b7189205ad1da2a5e8ea96c6126d7b968df45330b3325c514cc8f906a5495a85b841b20c63dfda49edac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"Ktp9v8kSUNxp56s4Xke7dh6rxF6AA5XnMB"
					]
				}
			}
		],
		"blockhash": "0000000039a01bf0a24d7caee86bd0e3666bf8498984bc170734860c9854ee03",
		"time": 1538305435,
		"blocktime": 1538305435
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2018-09-30",
			blockHeight: 0,
			blockHash: "0000000039a01bf0a24d7caee86bd0e3666bf8498984bc170734860c9854ee03",
			summary: "The Khorium Genesis Block.",
			alertBodyHtml: "This is the first block in the Khorium blockchain, known as the 'Genesis Block'.",
			referenceUrl: "https://en.bitcoin.it/wiki/Genesis_block"
		},
		{
			type: "tx",
			date: "2018-09-30",
			txid: "4cdd04f307750477d1e024c79c6112e5a0644e55c4ced223b245070ec755b86d",
			summary: "The coinbase transaction of the Genesis Block.",
			alertBodyHtml: "This transaction doesn't really exist! This is the coinbase transaction of the <a href='/block/0000000039a01bf0a24d7caee86bd0e3666bf8498984bc170734860c9854ee03'>Khorium Genesis Block</a>. For more background about this special-case transaction, you can read <a href='https://github.com/bitcoin/bitcoin/issues/3303'>this brief discussion</a> among some of the <a href='https://bitcoin.org'>Bitcoin</a> developers.",
			referenceUrl: "https://github.com/bitcoin/bitcoin/issues/3303"
		},
		{
			type: "blockheight",
			date: "2018-11-19",
			blockHeight: 4200,
			blockHash: "0002ee0d7dd32f7569493fb774fe3614b69384e1c183989686e0eaa9e9cc1854",
			summary: "The last premined Block by Developers.",
			alertBodyHtml: "This is the last premined block by devs in the Khorium blockchain.",
			referenceUrl: "https://explorer.khorium.org/block-height/4200"
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Bitcoin/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return responseBody[0].price_usd;
			}

			return -1;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
	}
};
