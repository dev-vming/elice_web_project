import { Project } from "../db";

class projectService {
  static async addProject({
    userId,
    title,
    content,
    startDate,
    endDate,
    editorStateSave,
    imgs,
  }) {
    const newProject = {
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
      imgs,
    };
    const createdNewProject = await Project.create(newProject);
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProjectsAll({ perPage, offset }) {
    console.log("perPage(서비스)", perPage);
    console.log("offset(서비스)", offset);
    // const findUser = await User.findById({ userId });
    const projects = await Project.findAll({ perPage, offset });
    return projects;
  }


  static async getAllProjects() {
    const projects = await Project.findAll();
    return projects;
  }

  static async deleteProject({ _id }) {
    const projects = await Project.delete({ _id });
    return projects;
  }

  static async updateProject({ _id }, { toUpdate }) {
    const updatedProject = await Project.update({ _id }, { ...toUpdate });
    return updatedProject;
  }
}

export { projectService };
