import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  console.log(certificate)
  console.log(certificate.certificatedDate)
  console.log(certificate.certificatedDate.split('T')[0])
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.name}</span>
          <br />
          <span className="text-muted">{certificate.issuingOrganization}</span>
          <br/>
          {/* {console.log(typeof certificate.certificatedDate)} */}
          <span className="text-muted">{certificate.certificatedDate.split('T')[0]}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
