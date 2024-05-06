import multer from 'multer';
import fs from 'fs';
import path from 'path';
import productModel from '../models/product.model';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./uploads/photoclasses')) {
            cb(null, './uploads/photoclasses')

        } else {
            fs.mkdirSync('./uploads/photoclasses')
            cb(null, './uploads/photoclasses')
        }
    },
    filename: function (req, file, cb) {

        let orName = file.originalname;
        let ext = path.extname(orName);
        let basename = path.parse(orName).name;
        let filename = basename + '-' + Date.now() + ext
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

// create product

export const createProductsController = (req, res) => {
    try {
        const addProductWithFile = upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: 'photo', maxCount: 10 }]);

        addProductWithFile(req, res, function (err) {
            if (err) return res.status(400).json({ message: err.message })

            const { carCategory, fuelCategory, transCategory, year, driven, title,
                description, price, email, number, name } = req.body

            let thumbnail = null;
            if (req.files['thumbnail']) {
                thumbnail = req.files['thumbnail'][0].filename
            }

            let imageArr = [];
            if (req.files['photo']) {
                for (let index = 0; index < req.files['photo'].length; index++) {
                    const element = req.files['photo'][index];
                    imageArr.push(element.filename)

                }
            }

            const productData = new productModel({
                carCategory: carCategory,
                fuelCategory: fuelCategory,
                transCategory: transCategory,
                year: year,
                driven: driven,
                title, title,
                description, description,
                price: price,
                email, email,
                number, number,
                name, name,
                thumbnail: thumbnail,
                photo: imageArr
            })

            productData.save();
            if (productData) {
                return res.status(201).json({
                    data: productData,
                    message: 'Created'
                })
            }
            return res.status(400).json({
                message: 'Bad request'
            })
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// get all product
// export const getAllProductController = async (req, res) => {
//     try {
//         const { limit, page, search } = req.query
//         const skipno = limit * (page - 1)
//         const pipeline = [
//             {
//                 $lookup: {
//                     from: "cars",
//                     localField: "carCategory",
//                     foreignField: "_id",
//                     as: "carCategory"
//                 },
//             },
//             { $unwind: "$carCategory" },
//             { $sort: { '_id': 1 } },
//              { $limit: 15 },


//             {
//                 $lookup: {
//                     from: "fuels",
//                     localField: "fuelCategory",
//                     foreignField: "_id",
//                     as: "fuelCategory"
//                 },
//             },
//             { $unwind: "$fuelCategory" },
//             { $sort: { '_id': 1 } },
//              { $limit: 15 },

//             {
//                 $lookup: {
//                     from: "transmissions",
//                     localField: "transCategory",
//                     foreignField: "_id",
//                     as: "transCategory"
//                 },
//             },
//             { $unwind: "$transCategory" },
//             { $sort: { '_id': 1 } },
//              { $limit: 15 },
//         ]
//         const generateSearchRgx = (pattern) => new RegExp(`.*${pattern}.*`)
//         const searchRgx = generateSearchRgx(search)
//         let filter = {}
//         if (search) {
//             filter = {
//                 $or: [
//                     { "carCategory.car_name": { $regex: searchRgx, $option: "i" } },
//                     { "fuelCategory.fuel_name": { $regex: searchRgx, $option: "i" } },
//                     { "transCategory.trans_name": { $regex: searchRgx, $option: "i" } },
//                 ]
//             }
//             pipeline.push({ $match: filter })
//         }
//         if (parseInt(limit) && parseInt(page)) {
//             pipeline.push({ $skip: skipno }, { $limit: parseInt(limit)})
//         }

//         const products = await productModel.aggregate(pipeline);

//         if (products) {
//             return res.status(200).json({
//                 data: products,
//                 message: 'Fetched!',
//                 filepath: "http://localhost:8001/uploads/photoclasses"
//             });
//         }
//         return res.status(404).json({
//             message: 'No data found'
//         });

//     } catch (error) {
//         // console.error("Error fetching popular classes:", error);
//         return res.status(500).json({
//             message: 'Internal Server Error'
//         });
//     }
// }

// get all product
export const getAllProductController = async (req, res) => {
    try {
        const { limit, page, search } = req.query;
        const skipno = limit * (page - 1);
        const pipeline = [];

        // Car lookup
        pipeline.push(
            {
                $lookup: {
                    from: "cars",
                    localField: "carCategory",
                    foreignField: "_id",
                    as: "carCategory"
                },
            },
            { $unwind: "$carCategory" }
        );

        // Fuel lookup
        pipeline.push(
            {
                $lookup: {
                    from: "fuels",
                    localField: "fuelCategory",
                    foreignField: "_id",
                    as: "fuelCategory"
                },
            },
            { $unwind: "$fuelCategory" }
        );

        // Transmission lookup
        pipeline.push(
            {
                $lookup: {
                    from: "transmissions",
                    localField: "transCategory",
                    foreignField: "_id",
                    as: "transCategory"
                },
            },
            { $unwind: "$transCategory" }
        );

        // Sorting and limiting
        pipeline.push(
            { $sort: { '_id': 1 } },
            { $limit: 1000 }
        );

        // Filter based on search
        if (search) {
            const searchRgx = new RegExp(`.*${search}.*`, 'i');
            pipeline.push({
                $match: {
                    $or: [
                        { "carCategory.car_name": searchRgx },
                        { "fuelCategory.fuel_name": searchRgx },
                        { "transCategory.trans_name": searchRgx }
                    ]
                }
            });
        }

        // Pagination
        if (parseInt(limit) && parseInt(page)) {
            pipeline.push({ $skip: skipno }, { $limit: parseInt(limit) });
        }

        const products = await productModel.aggregate(pipeline);

        if (products.length > 0) {
            return res.status(200).json({
                data: products,
                message: 'Fetched!',
                filepath: "http://localhost:8001/uploads/photoclasses"
            });
        } else {
            return res.status(404).json({
                message: 'No data found'
            });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// get single product
export const singleProductController = async (req, res) => {
    try {
        const categoryID = req.params.category_id
        const product = await productModel.findOne({ _id: categoryID }).populate("carCategory").populate("fuelCategory").populate("transCategory");
        if (product) {
            return res.status(200).json({
                data: product,
                message: 'fetched',
                filepath: "http://localhost:8001/uploads/photoclasses"
            })
        }
        return res.status(400).json({
            message: 'Bad request'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// update product
export const updateProductController = async (req, res) => {
    try {
        upload.fields([{ name: "photo", maxCount: 10 }, { name: "thumbnail", maxCount: 1 }])(req, res, async function (err) {
            if (err) return res.status(400).json({ message: err.message });
            const productID = req.params.category_id;
            const existProduct = await productModel.findOne({ _id: productID });
            const { carCategory, fuelCategory, transCategory, year, driven, title, description, price, email, number, name} = req.body;
            let photos = existProduct.photo || [];
            let thumbnail = existProduct.thumbnail;

            if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
                req.files['photo'].forEach(file => {
                    photos.push(file.filename);
                });

                // Remove old photos
                photos.forEach(photo => {
                    if (!req.files['photo'].find(file => file.filename === photo)) {
                        if (fs.existsSync('./uploads/photoclasses/' + photo)) {
                            fs.unlinkSync('./uploads/photoclasses/' + photo);
                        }
                    }
                });
            }

            if (req.files && req.files['thumbnail'] && req.files['thumbnail'].length > 0) {
                thumbnail = req.files['thumbnail'][0].filename;
                if (existProduct.thumbnail) {
                    if (fs.existsSync('./uploads/thumbnails/' + existProduct.thumbnail)) {
                        fs.unlinkSync('./uploads/thumbnails/' + existProduct.thumbnail);
                    }
                }
            }

            const updatedProduct = await productModel.updateOne({ _id: productID }, {
                $set: {
                    carCategory: carCategory,
                    fuelCategory: fuelCategory,
                    transCategory: transCategory,
                    year: year,
                    driven: driven,
                    title: title,
                    description: description,
                    price: price,
                    email: email,
                    number: number,
                    name: name,
                    photo: photos,
                    thumbnail: thumbnail
                }
            });

            if (updatedProduct.nModified !== 0) {
                return res.status(200).json({
                    message: 'Updated'
                });
            }
            return res.status(400).json({
                message: 'Bad request'
            });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// delete products
export const deleteProductController = async (req, res) => {
    try {
        const productID = req.params.category_id;
        const existProducts = await productModel.findOne({ _id: productID });
        const product = await productModel.deleteOne({ _id: productID });
        if (product.acknowledged) {

            if (fs.existsSync('./uploads/photoclasses/' + existProducts.thumbnail)) {
                fs.unlinkSync('./uploads/photoclasses/' + existProducts.thumbnail)
            }
             else if (fs.existsSync('./uploads/photoclasses/' + existProducts.photo)) {
                fs.unlinkSync('./uploads/photoclasses/' + existProducts.photo)
            }
          

            return res.status(200).json({
                message: 'Deleted'
            })
        }

        return res.status(400).json({
            message: 'Bad request'
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



