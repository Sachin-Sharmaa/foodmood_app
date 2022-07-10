import dbConnect from '../../../util/mongo';
import Dish from '../../../models/Dish';

export default async function handler(req, res) {
	const {method, cookies} = req;
	const token = cookies.token;
	dbConnect();

	if (method === 'GET') {
		try {
			const dishes = await Dish.find();
			res.status(200).json(dishes);
		}
		catch(err) {
			res.status(500).json(err);
		}
	}

	if (method === 'POST') {
		if (!token || token !== process.env.token) {
			return res.status(401).json('Not Authenticated !');
		}
		try {
			const dish = await Dish.create(req.body);
			res.status(201).json(dish);
		}
		catch(err) {
			res.status(500).json(err);
		}
	}
}

