<<<<<<< HEAD
import React, { useState } from "react";
import EducationCard from "../../../hooks/EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable , setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;
=======
import React, { useState } from "react";
import EducationCard from "../../../hooks/EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ portfolioOwnerId, education, setEducations, isEditable , setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <EducationCard
          education={education}
          setEducations={setEducations}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </>
  );
}

export default Education;
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
