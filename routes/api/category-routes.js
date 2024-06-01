const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Information not found.'})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    if (!category) {
      res.status(404).json({ message: 'Could not locate by id.'});

      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Content not found.' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create new category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    !updated[0] ? res.status(404).json({ message: 'Could not update by id' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    !deleted ? res.status(400).json({ message: 'Could not find by id' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
