import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Poll = ({question}) => {
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate(`/question/${question.id}`);
    }

    const dateFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'});
    const timeFormat = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'});

    return (
        <Col>
            <Card style={{ width: '14rem' }}>
                <Card.Header>{question.author}</Card.Header>
                <Card.Body>
                    <Card.Text>
                    <small>{dateFormat.format(question.timestamp)} | {timeFormat.format(question.timestamp)}</small>
                    </Card.Text>
                    <Button variant="primary" onClick={onClick}>Show</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Poll;