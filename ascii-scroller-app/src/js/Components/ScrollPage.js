import * as React from "react";
import AsciiCanvas from "./AsciiCanvas";
import OptionBar from "./OptionBar";
import AsciiSubmittionForm from "./AsciiSubmittionForm";

import '../../css/PageStyles.css'

import ScrollState from "../ScrollStates/ScrollState"

class ScrollPage extends React.Component{


    constructor(props) {
        const placeholderString = "  \n" +
            "     __    __\n" +
            "    (O )  (O )\n" +
            "     \\ \\   \\ \\\n" +
            "      ) )   ) )\n" +
            "     _( (___( (__\n" +
            "    /            \\\n" +
            "   /<<          >>\\\n" +
            "  /<<            >>\\\n" +
            " (      < >         )\n" +
            "  \\                /\n" +
            "   \\  vvvvvvvv    /\n" +
            "    \\____   _____/ \n" +
            "        _|  |_ \n" +
            "       /      \\\n" +
            "      / /|  |\\ \\\n" +
            "     | | |  | | |\n" +
            "     \\ / |  | \\ /\n" +
            "      W  /   \\ W\n" +
            "        / /\\  \\\n" +
            "     __/ /  \\  \\__\n" +
            "    (___|    |____)  "


        super(props);
        this.state = {
            asciiString: placeholderString,
            scrollState: ScrollState.LEFT
        }

        this.setScrollState = this.setScrollState.bind(this)
        this.setAsciiArt = this.setAsciiArt.bind(this)
        this.resetSubmissionState = this.resetSubmissionState.bind(this)
    }

    render(){
        return(
            <div className="mainPage">
                <OptionBar updateScrollState={this.setScrollState}/>
                <AsciiCanvas ascii={this.state.asciiString}
                             shiftDerection={this.state.scrollState}
                             submissionRecieved={this.resetSubmissionState}
                             resetScrollState={this.setScrollState}/>
                <AsciiSubmittionForm submit={this.setAsciiArt}/>
            </div>
        );

    }

    setScrollState(newState){
        console.log("new Scroll State")
        this.setState({scrollState: newState})
    }

    setAsciiArt(ascii){
        console.log("New Art")
        console.log(ascii)
        this.setState({asciiString:ascii, newSubmission: true})
    }

    resetSubmissionState(){
        this.setState({newSubmission: false})
    }




}
export default ScrollPage;