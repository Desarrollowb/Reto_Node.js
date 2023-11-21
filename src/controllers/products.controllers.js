import { Product } from "../models/Product.js"
import Joi from 'joi'


export const getProducts = async (req, res) => {

    try {

        const products = await Product.findAll()

        res.json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({
            where: {
                id
            }
        })
if (!product) return res.status(404).json('Product does not exist')

        res.json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



export const createProduct = async (req, res) => {
    const { name, brand, description } = req.body

    const schema = Joi.object({
        name: Joi.string().required(),
        brand: Joi.string().required(),
        description: Joi.string().required(),
    });

    const validation = schema.validate({ name, brand, description });

    if (validation.error) {
        return res.status(400).json({ message: validation.error.details[0].message });
    }


    try {
        const newProduct = await Product.create({
            name,
            brand,
            description
        })

        res.json(newProduct)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, brand, description } = req.body
        const product = await Product.findByPk(id)
        product.name = name
        product.brand = brand
        product.description = description
        await product.save()

        res.json(product)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await Product.destroy({
            where: {
                id,
            },
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
