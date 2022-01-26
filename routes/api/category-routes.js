const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ],
    })
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({
      category_name
    });
    res.json(newCategory);
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
