const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');
const app = express();
const port = 1245;

const getAsync = promisify(client.get).bind(client);

const listProducts = [{Id: 1, name: 'Suitcase 250', price: 50, stock: 4},
	{Id: 2, name: 'Suitcase 450', price: 100, stock: 10},
	{Id: 3, name: 'Suitcase 650', price: 350, stock: 2},
	{Id: 4, name: 'Suitcase 1050', price: 550, stock: 5}]

function getItemById(id){
	const item = listProducts.filter(item => item.Id === id);
	console.log(item);
}

app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

function reserveStockById(itemId, stock){
	client.set(`item.${itemId}`, stock)
}

async function getCurrentReservedStockById(itemId){
	return await getAsync(`item.${itemId}`)
}

app.get('/list_products/:itemId', async (req, res) => {
	const prod_id = getItemById(Number(req.params.itemId))
	if (!prod_id) {
		res.json({"status":"Product not found"});
        return;
	}
	const curr_stock = await getCurrentReservedStockById(Number(req.params.itemId));
	if (!curr_stock) {
		await reserveStockById(Number(req.params.itemId), prod_id.initialAvailableQuantity);
		prod_id.currentQuantity = prod_id.initialAvailableQuantity;
	} else{
	prod_id.currentQuantity = curr_stock;
    res.json(prod_id);
	}
});

app.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = Number(req.params.itemId);
	const item = getItemById(itemId);
	const noStock = { status: "Not enough stock available", itemId };
	const reservationConfirmed = { status: "Reservation confirmed", itemId };

	if (!item) {
	res.json({"status":"Product not found"});
	return;
	}

	let currentStock = await getCurrentReservedStockById(itemId);
	if (currentStock === null) currentStock = item.stock;

	if (currentStock <= 0) {
	res.json(noStock);
	return;
	}

	reserveStockById(itemId, Number(currentStock) - 1);

	res.json(reservationConfirmed);
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
