import { Link } from "react-router-dom";

const PollsItem = ({question}) => {
    return (
        <div>
            <span>${question.author}</span>
            <span>${question.timestamp}</span>
            <Link to={`/question/${question.id}`} >Show</Link>
        </div>
    );
};

export default PollsItem;