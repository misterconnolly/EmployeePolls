import { Link } from "react-router-dom";

const Poll = ({question}) => {
    return (
        <div>
            <span>${question.author}</span>
            <span>${question.timestamp}</span>
            <span>${question.timestamp}</span>
            <Link to={`/question/${question.id}`} >Show</Link>
        </div>
    );
};

export default Poll;