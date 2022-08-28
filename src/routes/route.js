const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisher=require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher",publisher.createPublisher)





router.get("/getAuthorsData", authorController.getAuthorsData)
router.post("/createBook", bookController.createBook  )
router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)


//router.get("/getBooksDataWithPublisher", bookController.getBookWithPublisherDetails)
module.exports = router;