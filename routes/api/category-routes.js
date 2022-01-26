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
    const category = await Category.findByPk(
      // find the category by it's primary key
      req.params.id,
      // include the associated products
      {
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          },
        ],
      }
    );
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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // get category_name from the form
  const { category_name } = req.body;

  try {
    await Category.update(
      { category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    // get the updated category by it's primary key
    const category = await Category.findByPk(req.params.id);
    // display updated category
    res.json(category);
  } catch (error) {
    res.json(error);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // get the category to be deleted so we can display it after it
    // gets deleted
    const deletedCategory = await Category.findByPk(req.params.id);
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.json(deletedCategory);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
