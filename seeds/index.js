const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/CampGrounds', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fb65dae9a70c404e03b97f1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                    url: 'https://res.cloudinary.com/campground3/image/upload/v1605844541/CampGround/q5j0wp0hlgb7mpeizze0.png',
                    filename: 'CampGround/q5j0wp0hlgb7mpeizze0'
                },
                {
                    url: 'https://res.cloudinary.com/campground3/image/upload/v1605844541/CampGround/idqsvuwxoggrrvoxujmz.jpg',
                    filename: 'CampGround/idqsvuwxoggrrvoxujmz'
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere maiores, maxime aspernatur, nam optio iste quas nesciunt beatae laboriosam deleniti ducimus! Architecto, numquam sed! At excepturi fugiat qui quos perferendis?',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});