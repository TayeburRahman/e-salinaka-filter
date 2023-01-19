const { createProduct, getAllProduct, getCategoryByProduct, filterProduct, deleteProduct, productFindings } = require("../controllers/product.controllers");
//  const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/upload').post(createProduct);
router.route('/').get(getAllProduct); 
router.route('/filter').get(filterProduct);   

router.route('/remove/:id').delete(deleteProduct);  

 

module.exports = router;