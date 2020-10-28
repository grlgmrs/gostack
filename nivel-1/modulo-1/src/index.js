const { v4: uuid, validate: isUuid } = require("uuid");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ message: "Project uuid is not valid" });
  }

  const projectIndex = findProject(id);

  if (projectIndex < 0) {
    return res.status(404).json({ message: "Project not found" });
  }

  req.body.$projectIndex = projectIndex;

  next();
}

app.use(logRequests);
app.use("/projects/:id", validateProjectId);

const findProject = (id) => projects.findIndex((project) => project && project.id === id);

app.get("/projects", (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(results);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = {
    id: uuid(),
    title,
    owner,
  };

  projects.push(project);

  return res.status(201).json(project);
});

app.put("/projects/:id", (req, res) => {
  const { title, owner } = req.body;
  const projectIndex = req.body.$projectIndex;

  const project = {
    ...projects[projectIndex],
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete("/projects/:id", (req, res) => {
  const projectIndex = req.body.$projectIndex;

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3000, () => {
  console.log("🚀 Application running on http://localhost:3000");
});
