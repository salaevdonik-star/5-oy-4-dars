const { Router } = require("express");
const authorization = require("../middleware/authorization");
const { toggleLike, getLikes } = require("../controller/like.controller");

const likeRouter = Router();

likeRouter.post("/like/:citation_id", authorization, toggleLike);
likeRouter.get("/likes/:citation_id", getLikes);

module.exports = likeRouter;