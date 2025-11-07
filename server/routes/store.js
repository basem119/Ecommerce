const express = require("express");
const router = express.Router();

const {
  getStore,
  createStore,
  updateStore,
  deleteStore,
  getAllStores,
} = require("../controllers/store");

router.route("/")
  .get(getAllStores)
  .post(createStore);

router.route("/:id")
  .get(getStore)
  .put(updateStore)
  .delete(deleteStore);

module.exports = router;