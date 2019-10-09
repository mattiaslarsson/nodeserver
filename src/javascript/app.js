const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({type: function() {
    return true;
  }
});
const port = 3000;

const dao = require('./persistence/dao');
dao.connect();
require('./routes/rootRoutes')(server, jsonParser);
require('./routes/userRoutes')(server, jsonParser, dao);

server.use(jsonParser);

server.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});