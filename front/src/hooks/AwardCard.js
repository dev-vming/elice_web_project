import { Card, Button, Row, Col } from "react-bootstrap";

function AwardCard({ award, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title} {award.description}</span>
          <br />
          <span className="text-muted">{award.getDate} 취득</span>
          <br />
        </Col>
        {award.awardInfo && (
          <Col>
            <span className="text-muted">{award.awardInfo}</span>
          </Col>
        )}
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

export default AwardCard;
