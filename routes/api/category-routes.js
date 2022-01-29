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
    // display categories
    res.status(200).json(categories);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
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
            attributes: ['id', 'product_name', 'price', 'stock']
          },
        ],
      }
    );
    // display category
    res.status(200).json(category);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // create new category
    const newCategory = await Category.create(req.body);
    // display newly created category 
    res.status(200).json(newCategory);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // update category
    await Category.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    )
    // get the updated category by it's primary key
    const category = await Category.findByPk(req.params.id);
    // display updated category
    res.status(200).json(category);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // get the category to be deleted so we can display it after it
    // gets deleted
    const deletedCategory = await Category.findByPk(req.params.id);
    // delete the selected category
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // display the deleted category
    res.status(200).json(deletedCategory);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
  }
});

module.exports = router;
