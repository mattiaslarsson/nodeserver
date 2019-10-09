module.exports = (app, jsonParser, dao) => {

  app.get("/user", jsonParser, (req, res) => {
    dao.findAll().then((users) => {
      res.status(200)
      .header("content-type", "application/json")
      .end(JSON.stringify(users) + "\n");
    });
  });

  app.get("/user/:name", jsonParser, (req, res) => {
    dao.findByName(req.params.name).then((users) => {
      if (users.length == 0) {
        res.status(404)
        .end();
      } else {
        res.status(200)
        .header("content-type", "application/json")
        .end(JSON.stringify(users) + "\n");
      }
    });

  });

  app.delete("/user/:id", jsonParser, (req, res) => {
    dao.deleteById(req.params.id).then((result) => {
      if (result.deletedCount == 0) {
        res.status(404)
        .end();
      } else {
        res.status(204)
        .end();
      }
    });
  });

  app.post("/user", jsonParser, (req, res) => {
    let response;
    let user = req.body;

      dao.saveUser(user);

      response = {"status": "OK", "addedUser": user};
      res.status(204)
        .header("content-type", "application/json")
        .end(JSON.stringify(response));
  });
};