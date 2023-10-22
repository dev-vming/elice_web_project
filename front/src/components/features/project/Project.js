import React, { useState } from "react";
import ProjectCard from "../../../hooks/ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ portfolioOwnerId, project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          portfolioOwnerId={portfolioOwnerId}
          currentProject={project}
          setProjects={setProjects}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Project;
