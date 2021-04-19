import * as React from "react";
import '../../css/PageStyles.css'
import ScrollState from "../ScrollStates/ScrollState";


class OptionBar extends React.Component{

    constructor(props) {
        super(props);

        this.updateScroll = this.updateScroll.bind(this)
    }

    render(){
        return(
            <div className='optionBar'>
                <button onClick={ () => this.updateScroll(ScrollState.LEFT)}>ShiftLeft</button>
                <button onClick={ () => this.updateScroll(ScrollState.RIGHT)}>ShiftRight</button>
                <button onClick={ () => this.updateScroll(ScrollState.UP)}>ShiftUP</button>
                <button onClick={ () => this.updateScroll(ScrollState.DOWN)}>ShiftDown</button>
                <button onClick={ () => this.updateScroll(ScrollState.CRAYS_TOWN)}>GimmiTheGitters</button>

                <button onClick={ () => this.updateScroll(ScrollState.RESET)}>RESET</button>
            </div>
        );

    }

    updateScroll(newState){
        console.log(newState)
        this.props.updateScrollState(newState)
    }
}
export default OptionBar;