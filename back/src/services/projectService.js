import { Project } from "../db/index";

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

  static async getProjectDetail(_id) {
    const projectDetail = await Project.findByProjectId({ _id });
    return projectDetail;
  }

  static async getProjectContent(content) {
    console.log("service : ", content);
    const projectContent = await Project.findByContent({ content });
    return projectContent;
  }

  static async deleteProject({ _id }) {
    const result = await Project.delete({ _id });
    return result;
  }

  static async updateProject({ _id }, toUpdate) {
    const updatedProject = await Project.update({ _id }, toUpdate);
    return updatedProject;
  }
}

export { projectService };
