import './Survey.css';
import Radio from './Radio';
import Popup from './Popup';
import { useState } from 'react';
import Disclaimer from './Disclaimer';
import { Redirect } from "react-router-dom";

function Survey({authorized}) {
  const [responseone, setResponseOne] = useState(false);
  const [responsetwo, setResponseTwo] = useState(false);
  const [responsethree, setResponseThree] = useState(false);
  const [responsefour, setResponseFour] = useState(false);
  const [responsefive, setResponseFive] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [diclaimerButton, setDiclaimerButton] = useState(false)
  const [problems, setProblems] = useState([])
  if(!authorized){ return <Redirect to="/" />;}
  const handleInputOne = () => {
    setResponseOne(true);
  }
  const handleInputTwo = () => {
    setResponseTwo(true);
  }
  const handleInputThree = () => {
    setResponseThree(true);
  }
  const handleInputFour = () => {
    setResponseFour(true);
  }
  const handleInputFive = () => {
    setResponseFive(true);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (problems.length === 0 || !responseone || !responsetwo || !responsethree || !responsefour || !responsefive) {
      alert("Answer all questions")
      return
    }
    setButtonPopup(true)
  }

  var quality = {
    one: " - Bad",
    two: " - Less than average",
    three: " - Average",
    four: " - Better than average",
    five: " - Good"
  };

  var frequency = {
    one: " - Never",
    two: " - Hardly ever",
    three: " - Sometimes",
    four: " - Somewhat often",
    five: " - Frequently"
  };

  var quantity = {
    one: " - None",
    two: " - A little",
    three: " - Partially",
    four: " - A lot",
    five: " - Entirely"
  };

  const inProb = event => {
    if (event.target.checked) {
      setProblems([...problems, event.target.value])
    }
    else {
      setProblems(problems.filter(problem => problem !== event.target.value))
    }
  }

  // Testing Console Log
  // function printOut() {
  //   console.log(problems.length)
  // }

  return (
    <div>
      <div className="container">
        <h1>Reminisk Survey</h1>
        <h6 className="survey-instruction">Please answer all questions</h6>
        <button className="disclaimer" onClick={() => setDiclaimerButton(true)}>Disclaimer</button>
        <hr></hr>
        <form className="survey-container" action="#" onSubmit={onSubmit}>
          <p className="survey-instruction">
            1. Have you experienced or currently experiencing any of the following problems?
          </p>
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
          <br />
          <p className="survey-instruction">
            2. On the scale below, how would you rate your current well being?
          </p>

          <Radio group={"'r-group-one'"} onInput={handleInputOne} qtype={quality}></Radio>
          <br />
          <p className="survey-instruction">
            3. How often have the issue(s) above cause you any emotional distress, such as feeling depressed, sad, or anxious?
          </p>
          <Radio group={"'r-group-two'"} onInput={handleInputTwo} qtype={frequency}></Radio>
          <br />
          <p className="survey-instruction">
            4. How much of an affect do the/these issue(s) have on social interactions?
          </p>
          <Radio group={"'r-group-three'"} onInput={handleInputThree} qtype={quantity}></Radio>
          <br />
          <p className="survey-instruction">
            5. How much of an affect do the/these issue(s) have your sleeping schedule?
          </p>
          <Radio group={"'r-group-four'"} onInput={handleInputFour} qtype={quantity}></Radio>
          <br />
          <p className="survey-instruction">
            6. How much of an affect do the/these issue(s) negatively affected your physical routines, such as work, exercise, or hobbies?
          </p>
          <Radio group={"'r-group-five'"} onInput={handleInputFive} qtype={quantity}></Radio>
          <br />
          <input className="submit" type="submit" value="Submit" />
        </form>
        <Disclaimer trigger={diclaimerButton} setTrigger={setDiclaimerButton} />
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} searchProblems={problems}/>
      </div>
    </div>
  )
}

export default Survey
