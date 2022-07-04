const { router, get } = require("microrouter");

const {
   flickrapi
  } = require("./routes/index.js");
  
module.exports = router(
    get("/", flickrapi)
);