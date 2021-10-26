import "./Search.css"

// INPUT BUTTON onChange={onInput}
function searchButtons( { problem, setFacility }) {
    var mentalHealth = "Mental Health Clinic"
    var substanceAbuse = "Drug Rehabilitation Center"
    var domViolence = "Domestic Violence Service"

    const handleFacility = event => {
        if (event.target.value === mentalHealth) {
            setFacility("mental health clinic")
        }
        else if (event.target.value === substanceAbuse) {
            setFacility("drug rehabilitation center")
        } 
        else if (event.target.value === domViolence) {
            setFacility("domestic violence service")
        }
    }
    // //check console.log
    // const consoleLog = (e) => {
    //     console.log(e.target.value)
    // }
    return (
        <>
             <p>
                <label className="buttons-lbl">
                    <input className="with-gap" name="problems" type="radio"  
                    value={ problem === "Mental Health" ? mentalHealth : problem === 
                    "Substance Abuse" ? substanceAbuse : domViolence}
                    onClick={handleFacility}
                    />
                    <span>
                       {problem}
                    </span>
                </label>
            </p>
        </>
    )
}

export default searchButtons
