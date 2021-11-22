import "./Shortcut.css"
import { Link } from "react-router-dom";
import { useState } from 'react';

function Shortcut() {
    const [problems, setProblems] = useState([])
    const inProb = event => {
        if (event.target.checked) {
          setProblems([...problems, event.target.value])
        }
        else {
          setProblems(problems.filter(problem => problem !== event.target.value))
        }
      }
    return (
        <div className="shortcut">
            <div className="shortcut-cntr">
                <h5 className="shortcut-hdr">Find professional help for your respective problems.</h5>
                <hr className="shortcut-line"/>
                <p>
            <label className="problem-lbl">
              <input className="filled-in" type="checkbox" value={"Mental Health"} onChange={inProb}/>
              <span>Mental Health</span>
            </label>
          </p>
          <p>
            <label className="problem-lbl">
              <input className="filled-in" type="checkbox" value={"Substance Abuse"} onChange={inProb}/>
              <span>Substance Abuse</span>
            </label>
          </p>
          <p>
            <label className="problem-lbl">
              <input className="filled-in" type="checkbox" value={"Domestic Violence"} onChange={inProb}/>
              <span>Domestic Violence</span>
            </label>
          </p>
          <div className="btn-cntr">
          {problems.length > 0 ?
          <Link to={{
                    pathname: '/search',
                    state: {
                        searchFor: problems
                    }
                }}>
                    <button className="accept-btn">Search</button>
                </Link>
                :
                <button className="accept-btn" disabled={true}>Select issue(s)</button>
                }
            </div>
            </div>
            
        </div>
    )
}

export default Shortcut
