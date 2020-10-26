const express = require("express");

const app = express();

app.use(express.json());

const projects = [
  { id: 1, title: "Projeto com react" },
  { id: 2, title: "Projeto com vue" },
];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(req, res, next) {
  const { id } = req.params;
  const projectIndex = findProject(id);

  if (projectIndex < 0) {
    return res.status(404).json({ message: "Project not found" });
  }

  req.body.$projectIndex = projectIndex;

  next();
}

app.use(logRequests);
app.use("/projects/:id", validateProjectId);

const findProject = (id) =>
  projects.findIndex((project) => project && project.id === parseInt(id));

app.get("/projects", (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(results);
});

app.post("/projects", (req, res) => {
  const { title } = req.body;

  const project = {
    id: projects.length + 1,
    title,
  };

  projects.push(project);

  return res.status(201).json(project);
});

app.put("/projects/:id", (req, res) => {
  const { title } = req.body;
  const projectIndex = req.body.$projectIndex;

  projects[projectIndex].title = title;

  return res.json(projects[projectIndex]);
});

app.delete("/projects/:id", (req, res) => {
  const projectIndex = req.body.$projectIndex;

  delete projects[projectIndex];

  return res.status(204).send();
});

app.listen(3000, () => {
  console.log("🚀 Application running on http://localhost:3000");
});
