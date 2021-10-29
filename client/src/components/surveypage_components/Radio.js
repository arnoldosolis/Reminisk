import "./Radio.css";


function Radio({ group, onInput, qtype }) {

    return (
        <div>
            <p>
                <label className="response-lbl">
                    <input className="with-gap" name={group} type="radio" onChange={onInput} />
                    <span>1
                        {qtype.one}
                    </span>
                </label>
            </p>
            <p>
                <label className="response-lbl">
                    <input className="with-gap" name={group} type="radio" onChange={onInput} />
                    <span>2
                        {qtype.two}
                    </span>
                </label>
            </p>
            <p>
                <label className="response-lbl">
                    <input className="with-gap" name={group} type="radio" onChange={onInput} />
                    <span>3
                        {qtype.three}
                    </span>
                </label>
            </p>
            <p>
                <label className="response-lbl">
                    <input className="with-gap" name={group} type="radio" onChange={onInput} />
                    <span >4
                        {qtype.four}
                    </span>
                </label>
            </p>
            <p>
                <label className="response-lbl">
                    <input className="with-gap" name={group} type="radio" onChange={onInput} />
                    <span>5
                        {qtype.five}
                    </span>
                </label>
            </p>
        </div>
    )
}

export default Radio
