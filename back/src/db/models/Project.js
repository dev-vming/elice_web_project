// import { ProjectModel } from "../schemas/project";

// class Project {
//   static async create({ newProject }) {
//     const createdNewProject = await ProjectModel.create(newProject);
//     return createdNewProject;
//   }

//   static async findByEmail({ email }) {
//     const project = await ProjectModel.findOne({ email });
//     return project;
//   }

//   static async findById({ user_id }) {
//     const project = await ProjectModel.findOne({ id: user_id });
//     return project;
//   }

//   static async findAll() {
//     const projects = await ProjectModel.find({});
//     return projects;
//   }

//   static async update({ user_id, fieldToUpdate, newValue }) {
//     const filter = { id: user_id };
//     const update = { [fieldToUpdate]: newValue };
//     const option = { returnOriginal: false };

//     const updatedUser = await ProjectModel.findOneAndUpdate(
//       filter,
//       update,
//       option
//     );
//     return updatedUser;
//   }
// }

// export { Project };
