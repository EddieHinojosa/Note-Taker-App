const router = require("express").Router();
const notesRoutes = require(".notes.js");
const htmlRoutes = require(".html.js");

//middleware
router.use("/notes", notesRoutes);
router.use("/", htmlRoutes);


module.exports = router;