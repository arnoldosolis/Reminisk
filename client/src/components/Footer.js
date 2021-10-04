import './Footer.css';
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <div className="footer-container">
            <div class="footer-links">
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>Resources</h2>
                        <Link to='/'>Place Holder Link: Resource 1</Link>
                        <Link to='/'>Place Holder Link: Resource 2</Link>
                        <Link to='/'>Place Holder Link: Resource 3</Link>
                        <Link to='/'>Place Holder Link: Resource 4</Link>
                        <Link to='/'>Place Holder Link: Resource 5</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
