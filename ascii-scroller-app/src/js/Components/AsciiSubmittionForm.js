import * as React from "react";
import '../../css/PageStyles.css'
import ScrollState from "../ScrollStates/ScrollState";


class AsciiSubmittionForm extends React.Component{

    constructor(props) {
        super(props);

        this.submitAssciArt = this.submitAssciArt.bind(this)
    }

    render(){
        return(
            <div>
                <textarea id={'input'}/><br/>
                <button onClick={this.submitAssciArt}>submit</button>
            </div>
        );

    }

    submitAssciArt(){
        console.log("adsjfsk")
        let input = document.getElementById('input').value
        console.log(input)
        this.props.submit(input)
    }


}
export default AsciiSubmittionForm;