const port = process.env.PORT || 3000;
const app = require("./app");
const { conn, seed, Campus, Student } = require("../db");

// Defining an endpoint that responds to GET requests with a list of all campuses/students

app.get("/api/campuses", async (req, res, next) => {
  try {
    res.send(await Campus.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (ex) {
    next(ex);
  }
});

// Defining an endpoint that responds to PUT requests to update a specific campus/student

app.put("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    res.send(await campus.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    res.send(await student.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

// Defining an endpoint that responds to POST requests to create a new campus/student

app.post("/api/campuses", async (req, res, next) => {
  try {
    res.status(201).send(await Campus.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

// Defining an endpoint that responds to DELETE requests to delete a specific campus/student

app.delete("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

// The server starts listening on the specified port, seeds the database, and then logs a message to the console

app.listen(port, async () => {
  try {
    console.log(`listening on port ${port}`);
    await seed();
    console.log("seeded");
  } catch (ex) {
    console.log(ex);
  }
});
