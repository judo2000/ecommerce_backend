const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    })
    res.status(200).json(tags)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(
      req.params.id,
      {
        // include the product assocition
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          }
        ]
      }
    );
    // display tag
    res.status(200).json(tag);
  } catch (error) {
    // display errors if any
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  // get category name entered by the user
  //const { tag_name } = req.body;
  try {
    // create new category
    const newTag = await Tag.create(req.body);
    // display newly created category
    res.status(200).json(newTag);
  } catch (error) {
    // display error if any
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // get new tag name 
  //const { tag_name } = req.body;
  try {
    // update tag
    await Tag.update(req.body,
      { 
        where: {
          id: req.params.id,
        },
      }
    );
    // get the updated tag by it's primary key
    const tag = await Tag.findByPk(req.params.id);
    // display updated tag
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // get the tag to be deleted so we can display it after it
    // gets deleted
    const deletedTag = await Tag.findByPk(req.params.id);
    // delete the selected tag
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
