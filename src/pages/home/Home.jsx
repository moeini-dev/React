import './home.css';
import { Navbar } from '../../components/Navbar/Navbar';

window.onscroll = function () {
    console.log(window.scrollY);
}

export function Home() {
    return (
        <div className="home">
            <Navbar />
            <div className="main">
                <div className="wrapper">This is a div</div>
            </div>
            <div className="footer"></div>
        </div>
    );
}