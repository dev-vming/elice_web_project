// import { Project } from "../db/schemas/project";
import { User } from "../db/index";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { Project } from "../db/index";
import { v4 as uuidv4 } from "uuid";

const projectRouter = Router();

// create project
projectRouter.post("/", login_required, async (req, res) => {
  // document 구성
  const id = uuidv4();
  const userId = await User.findById({ user_id: req.currentUserId });
  const newProject = { id, userId, ...req.body };
  // document 생성
  const projects = await Project.create(newProject);
  res.status(201).json(projects);
});

//read project
projectRouter.get("/", login_required, async (req, res) => {
  const projects = await Project.findAll();
  res.status(201).json(projects);
});

// read project by id
projectRouter.get("/:userId", login_required, async (req, res) => {
  const userId = await User.findById({ user_id: req.params.userId });
  const projects = await Project.findByUserId({ userId });
  res.status(201).json(projects);
});

// update project by id(uuid)
projectRouter.put("/:id", login_required, async (req, res) => {
  // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
  let id = req.params.id;
  console.log("id", id);
  let toUpdate = req.body;
  console.log("toUpdate", toUpdate);
  let updatedProject;

  for (let v in toUpdate) {
    if (toUpdate[v]) {
      console.log("업데이트 되라..", id, v, toUpdate[v]);
      updatedProject = await Project.update({
        id,
        fieldToUpdate: v,
        newValue: toUpdate[v],
      });
    }
  }
  res.status(201).json(updatedProject);
});

// delete project by id
projectRouter.delete("/:id", login_required, async (req, res) => {
  const id = req.params.id;
  const result = await Project.delete({ id });
  res.status(201).json(result);
});

export { projectRouter };
