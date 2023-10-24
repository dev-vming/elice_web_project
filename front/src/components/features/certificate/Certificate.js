<<<<<<< HEAD
import React, { useState } from "react";
import CertificateCard from "../../../hooks/CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certificate, setCertificates, isEditable, setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Certificate;
=======
import React, { useState } from "react";
import CertificateCard from "../../../hooks/CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ portfolioOwnerId, certificate, setCertificates, isEditable, setIsVisibility }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
          setIsVisibility={setIsVisibility}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
          setCertificates={setCertificates}
        />
      )}
    </>
  );
}

export default Certificate;
>>>>>>> 06470c725bbcfa7a50cfac1d88a6db39fc6f6810
