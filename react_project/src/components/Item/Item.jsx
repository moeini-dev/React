import './item.css';

export function Item(props) {
    return (
        <a href={props.link}>
            <div className="Items">
                {/* <img className="itemImage" src={require(`./../../assets/${props.image}`)} alt="" /> */}
                <img className="itemImage" src={`http://localhost:3000/images/${props.image}`} alt="" />
                <div className="itemName">{props.name}</div>
                <div className="itemAuthor">{props.author}</div>
            </div>
        </a>
    );
}