import { Navbar } from "../../components/Navbar/Navbar";
import './book.css';

export function Book(props) {
  return (
    <div className="book">
      <div className="bookTop">
        <Navbar />
      </div>
      <div className="bookMain">
        <div className="bookHeader">
          <div className="bookHeaderLeft">
            <div className="bookHeaderImage">
              <img src={require(`./../../assets/${props.image}`)} alt="" className="bookImage" />
            </div>
            <div className="bookHeaderProperties">
              <h1 className="bookTitle">The Old Man And The Sea</h1>
              <div className="bookProperties">
                <div className="bookPropertyKeys">
                  <p className="bookAuthorKey">Author:</p>
                  <p className="bookTranslatorKey">Translator:</p>
                  <p className="bookPublisherKey">Publisher:</p>
                </div>
                <div className="bookPropertyValues">
                  <p className="bookAuthorValue">Ernest Hemingway</p>
                  <p className="bookTranslatorValue">Majid Amigh</p>
                  <p className="bookPublisherValue">Penguain</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bookHeaderRight">
            <div className="price">18 $</div>
            <button className="goodreads">Check on Goodreads</button>
            <button className="addToCart">Add to your cart</button>
          </div>
        </div>
        <div className="bookDescription">
          <h2 className="bookDescriptionHeader">"The old man and the sea" by Ernest Hemingway</h2>
          <div className="bookDescriptionMain">
            <article>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequatur totam blanditiis, ex commodi laudantium natus et aut nisi molestias tempore harum voluptatum excepturi? Impedit asperiores repellendus  cumque modi aperiam. <br /> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptas aliquid temporibus cum consequuntur dolores incidunt dolore cupiditate repudiandae, unde deleniti assumenda maxime veniam facere ipsum ipsam aspernatur quaerat ex? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus mollitia laudantium praesentium possimus ipsum, veniam ullam saepe eaque quae ipsa quos asperiores voluptatem commodi quas optio ex dolore dolorem vel.lo
            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Voluptas non explicabo voluptatum eveniet. Earum quia necessitatibus dicta? Accusamus aliquid expedita incidunt fugit est facilis dolorem repudiandae quidem nostrum! Fugit, placeat?<br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis incidunt enim est accusantium?<br /> Et repellendus, fugiat minus labore beatae omnis? Voluptatibus temporibus consectetur porro. Quis voluptate facere unde natus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure eveniet modi obcaecati odit impedit excepturi quod fugiat ea eaque sint quos recusandae autem inventore vitae ipsam, veniam facilis, omnis earum!
            </article>
          </div>
        </div>
        <div className="bookComments">

        </div>
      </div>
    </div >
  );
}