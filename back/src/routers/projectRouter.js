import { ProjectModel } from "../db/schemas/project";
import { User } from "../db/index";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
// import { Project } from "../db/index";
import { v4 as uuidv4 } from "uuid";

const projectRouter = Router();

// create project
projectRouter.post("/", login_required, async (req, res) => {
  // document 구성
  const id = uuidv4();
  const author = await User.findById({ user_id: req.currentUserId });
  const newProject = { id, author, ...req.body };
  // document 생성
  const projects = await ProjectModel.create(newProject);
  res.status(201).json(projects);
});

//read project
projectRouter.get("/", login_required, async (req, res) => {
  const projects = await ProjectModel.find({}).populate("author");
  res.status(201).json(projects);
});

// read project by id
projectRouter.get("/:userId", login_required, async (req, res) => {
  const userId = await User.findById({ user_id: req.params.userId });
  const projects = await ProjectModel.find({ author: userId }).populate(
    "author"
  );
  res.status(201).json(projects);
});

// read project by id()
// projectRouter.get("/:id", login_required, async (req, res) => {
//   const id = req.params.id;
//   const projects = await ProjectModel.find({ id });
//   res.status(201).json(projects);
// });

// update project by id(project document의 ObjectId)
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
