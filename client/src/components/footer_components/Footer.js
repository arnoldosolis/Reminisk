import './Footer.css';

function Footer() {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row-resources">
                        <h5 className="white-text">Reminisk Resources</h5>
                </div>
                <div className="row">
                    <h5 className="white-text">Categories</h5>
                    <ul>
                        <li><a className="grey-text text-lighten-3" href="https://www.sprc.org/" target="_blank" rel="noreferrer">Suicide Prevention Resource Center</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.mentalhealth.gov/" rel="noreferrer">Mental Health</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.thehotline.org/" rel="nonreferrer">Domestic Abuse</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.samhsa.gov/find-treatment" rel="nonreferrer">Substance Abuse/Mental Health</a></li>
                    </ul>
                </div>
                <div className="row">
                    <h5 className="white-text">Donate </h5>
                    <ul>
                        <li><a className="grey-text text-lighten-3" href="https://afsp.org/give-a-gift" rel="nonreferrer">American Foundation for Suicide Prevention</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://mhanational.org/donate-mental-health-america" rel="nonreferrer">Mental Health America</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.domesticshelters.org/fundraisers/wish-lists" rel="nonreferrer">Domestic Violence Shelters</a></li>
                        <li><a className="grey-text text-lighten-3" href="https://www.drugabuse.gov/about-nida/donating-to-nida" rel="nonreferrer">National Institute on Drug Abuse</a></li>
                        
                    </ul>
                </div>
            </div>
            <div className="footer-copyright">
                © 2021 Reminisk
            </div>
        </footer>
    )
}

export default Footer
