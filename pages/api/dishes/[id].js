import dbConnect from '../../../util/mongo';
import Dish from '../../../models/Dish';

export default async function handler(req, res) {
	const {method, query: {id}, cookies} = req;
	const token = cookies.token;
	dbConnect();

	if (method === 'GET') {
		try {
			const dish = await Dish.findById(id);
			res.status(200).json(dish);
		}
		catch(err) {
			res.status("error").json(err);
		}
	}

	if (method === 'PUT') {
		if (!token || token !== process.env.token) {
			return res.status(401).json('Not Authenticated !');
		}
		try {
			const dish = await Dish.findByIdAndUpdate(id, req.body, {
				new: true
			});
			res.status(201).json(dish);
		}
		catch(err) {
			res.status(500).json(err);
		}
	}

	if (method === 'DELETE') {
		if (!token || token !== process.env.token) {
			return res.status(401).json('Not Authenticated !');
		}
		try {
			await Dish.findByIdAndDelete(id);
			res.status(200).json("The product has been deleted!");
		}
		catch(err) {
			res.status(500).json(err);
		}
	}
}

