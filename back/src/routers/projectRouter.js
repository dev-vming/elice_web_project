import { ProjectModel } from "../db/schemas/project";
import { User } from "../db/index";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

// create project
projectRouter.post("/", login_required, async (req, res) => {
  const projects = await ProjectModel.create({
    ...req.body,
  });
  res.status(201).json(projects);
});

// read project
projectRouter.get("/", login_required, async (req, res) => {
  const projects = await ProjectModel.find({}).populate("author");
  res.status(201).json(projects);
});

// read project by id
projectRouter.get("/:userId", login_required, async (req, res) => {
  const userId = req.params.userId;
  const projects = await ProjectModel.find({ author: userId }).populate(
    "author"
  );
  res.status(201).json(projects);
});

// read project by userId
// projectRouter.get("/:userId", login_required, async (req, res) => {
//   const author = req.params.userId;
//   const projects = await ProjectModel.find({ author });
//   res.status(201).json(projects);
// });

// update project by id
projectRouter.put("/:id", login_required, async (req, res) => {
  const id = req.params.id;
  const projects = await ProjectModel.updateOne({ id }, { ...req.body });
  res.status(201).json(projects);
});

// delete project by id
projectRouter.delete("/:id", login_required, async (req, res) => {
  const id = req.params.id;
  const projects = await ProjectModel.deleteOne({ id });
  res.status(201).json(projects);
});

export { projectRouter };
