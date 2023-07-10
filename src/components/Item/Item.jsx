import './item.css';

export function Item(props) {
    return (
        <a href={props.link}>
            <div className="featuredBookItem">
                <img className="itemImage" src={require(`./../../assets/${props.image}`)} alt="" />
                <div className="itemName">{props.name}</div>
                <div className="itemAuthor">{props.author}</div>
            </div>
        </a>
    );
}