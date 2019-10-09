
module.exports = (app, jsonParser) => {

  app.get("/", jsonParser, (req, res) => {
    res.setHeader("content-type", "application/json");
    const object = {"name":"mattias"};
    res.send(object);
  });

  app.post("/", jsonParser, (req, res) => {
    res.setHeader("content-type", "application/json");
    const response = {"status": "OK", "message": req.body};
    console.log(response);
    res.end(JSON.stringify(response));
  });
};