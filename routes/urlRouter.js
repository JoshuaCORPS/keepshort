const express = require('express');
const urlController = require('./../controllers/urlController');

const router = express.Router();

router
  .route('/')
  .get(urlController.getHome)
  .post(urlController.createUrl);

router.get('/:id', urlController.getUrl);
router
  .route('/result/:id')
  .get(urlController.getResult)
  .delete(urlController.deleteUrl);
router.get('/result/:id/total', urlController.getTotal);

module.exports = router;
