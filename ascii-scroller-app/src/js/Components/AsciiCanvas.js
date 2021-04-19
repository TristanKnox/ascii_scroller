import * as React from "react";
import ScrollState from "../ScrollStates/ScrollState"
import App from "../../App";
import Line from "../LineStructurs/Line"

import '../../css/PageStyles.css'
class AsciiCanvas extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            baseLineStates: [],
            displayLineStates: [],
            longestLineLen: 0,
            // lineCount: 0
        }


        this.parsAsciiString = this.parsAsciiString.bind(this)
        this.addLine = this.addLine.bind(this)
        this.propChangeTest = this.propChangeTest.bind(this)

        // this.getFrontOriginPosition = this.getFrontOriginPosition.bind(this)
        this.initLineTracking = this.initLineTracking.bind(this)
        // this.run = this.run.bind(this)
        // this.startTimer = this.startTimer.bind(this)


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.ascii !== prevProps.ascii)
            this.initAscii()
    }

    startTimer(){
        setInterval(()=>this.run(), 50)
    }

    componentDidMount() {
        this.initAscii()
    }

    initAscii(){
        let parsedAsciiData = this.parsAsciiString()
        let lCount = parsedAsciiData['lines'].length
        this.setState({baseLineStates: parsedAsciiData['lines']}, () => console.log(this.state.baseLineStates))
        this.setState({displayLineStates: parsedAsciiData['lines']},() => console.log(this.state.displayLineStates))
        this.setState({lineCount: lCount, longestLineLen: parsedAsciiData['longestLineLen']  }, () => this.initLineTracking())
    }

    initLineTracking(){
        let tempfront = this.getFrontOriginPosition()
        let tempback = this.getBackOriginPosition()
        let top = this.getTopOriginPosition()
        let bottom = this.getBottomOriginPosition()
        let emptyString = this.buildEmptyString()
        this.setState({front: tempfront, back: tempback, top: top, bottom: bottom, blankLine: emptyString}, () => this.startTimer() )
    }

    run(){
        this.updateDisplayLines()
        this.shift()
    }

    updateDisplayLines(){
        let baseLines = this.state.baseLineStates.map((line) => line)
        let newLines = []
        let index = 0
        for(let i = this.state.top; i < this.state.bottom; i++){
            let baseLine = this.getLine(baseLines, i)
            let newLine = this.getText(baseLine)
            newLines[index++] = newLine
        }
        this.setState({ displayLineStates: newLines})
    }



    shift(){
        let shiftDirection = this.props.shiftDerection
        switch (shiftDirection){
            case ScrollState.LEFT:
                this.shiftLeft()
                break
            case ScrollState.RIGHT:
                this.shiftRight()
                break
            case ScrollState.UP:
                this.shiftUP()
                break
            case ScrollState.DOWN:
                this.shiftDown()
                break
            case ScrollState.CRAYS_TOWN:
                this.randomShift()
                break
            case ScrollState.RESET:
                this.resetImage()
                break
        }
    }

    randomShift(){
        let shiftIndex = Math.floor(Math.random() * 4)
        if(shiftIndex === ScrollState.LEFT){
            this.shiftLeft()
        }
        if(shiftIndex === ScrollState.RIGHT){
            this.shiftRight()
        }
        if(shiftIndex === ScrollState.UP){
            this.shiftUP()
        }
        if(shiftIndex === ScrollState.DOWN){
            this.shiftDown()
        }
    }



    buildEmptyString(){
        let str = ""
        for(let i = 0; i < this.state.longestLineLen; i++)
            str += " "
        return str
    }

    propChangeTest(){
        // console.log(this.props.test)
        // return this.props.test
    }

    render(){
        let lineItems = this.state.displayLineStates.map((line) => <li>{line}</li>)
        // let linex = this.state.baseLineStates.map((line) => line)
        // console.log(linex)
        return(
            <div>
                <ul><div className="lineContainer">
                    <pre style={{color: 'green', fontSize: '1.5vw'}} >{lineItems}</pre>
                </div></ul>
                <h2>Create or Past New Ascii Here</h2>
            </div>
        )
    }


    parsAsciiString(){
        let lines = [];
        let longestLineLen = 0
        let currentLongestLen = 0
        let asciiString = this.props.ascii
        let currentChar = ""
        let currentLine = ""
        for(let i = 0; i < asciiString.length; i++){
            currentChar = asciiString[i]
            if(currentChar === "\n"){
                longestLineLen = this.addLine(currentLine, lines, currentLongestLen, longestLineLen)
                currentLine = ""
                currentLongestLen = 0
            }
            else{
                currentLine += currentChar
                currentLongestLen++
            }
        }
        longestLineLen = this.addLine(currentLine, lines, currentLongestLen, longestLineLen)
        this.normalizeLines(lines, longestLineLen)
        return {'lines':lines, 'longestLineLen': longestLineLen}
    }

    normalizeLines(lines, longestLineLen){
        for(let index in lines){
            lines[index] = this.normalizeLine(lines[index], longestLineLen)
        }
    }

    normalizeLine(line, longestLineLen){
        let spacessNeeded = longestLineLen - line.length
        let spaces = ""
        for(let i = 0; i < spacessNeeded; i++)
            spaces += " "
        return line + spaces
    }

    addLine(line, lines, currentLongestLen, longestLineLen){
        lines.push(line)
        if(currentLongestLen > longestLineLen)
            return currentLongestLen
        return longestLineLen
    }

    // calcLineCount(){
    //     let lineCount = 1
    //     for(let i = 0; i < this.props.ascii.length; i++){
    //         if(this.props.ascii[i] === '\n')
    //             lineCount ++;
    //     }
    //     return lineCount
    // }

    /////////////////////
    // Shift Controlls //
    /////////////////////

    getText(currentString){
        // console.log(currentString)
        let newString = ""
        let tempfront = this.state.front
        let tempback = this.state.back
        for(let i = tempfront; i <= tempback; i++){
            let char = this.getCharAt(currentString, i)
            newString += this.getCharAt(currentString, i)
        }
        return newString
    }

    getCharAt(string, index) {
        if (index < this.getFrontOriginPosition() || index >= this.getBackOriginPosition()) {
            return " "
        }
        return string[index]

    }
    getLine(lines, index){
        if(index < 0 || index >= this.getBottomOriginPosition()){
            return this.state.blankLine
        }
        return lines[index]
    }

    getFrontOriginPosition(){ return 0 }
    getBackOriginPosition(){ return this.state.longestLineLen }
    getTopOriginPosition(){ return 0 }
    getBottomOriginPosition(){ return this.state.lineCount }

    isAtOrigin(){
        return this.state.front === this.getFrontOriginPosition() && this.state.back === this.getBackOriginPosition()
    }

    hasScrolledOffScreenLeft(){
        // true when front has moved passed backOriginPoint
        return this.state.front > this.getBackOriginPosition()
    }

    hasScrolledOffScreenRight(){
        // true when back has moved passed frontOriginPoint
        return this.state.back < this.getFrontOriginPosition()
    }

    hasScrolledOffScreenUp(){
        return this.state.top > this.getBottomOriginPosition()
    }

    hasScrolledOffScreenDown(){
        return this.state.bottom < this.getTopOriginPosition()
    }

    shiftLeft(){
        if(!this.hasScrolledOffScreenLeft()){
            // Text Scrolls Left so front/back move right
            let tempFront = this.state.front + 1
            let tempBack = this.state.back +1
            this.setState({front: tempFront, back: tempBack})
        }
        else{
            this.setScrollInLeft()
        }
    }

    setScrollInLeft(){
        let lineLen = this.state.longestLineLen
        let tempFront = -1 - lineLen
        let tempBack = -1
        this.setState({front: tempFront, back: tempBack})
    }

    shiftRight(){
        if(!this.hasScrolledOffScreenRight()){
            // Text Scrolls Right so front/back move left
            let tempfront = this.state.front - 1
            let tempback = this.state.back - 1
            this.setState({front: tempfront, back: tempback})
        }
        else{
            this.setScrollInRight()
        }
    }
    setScrollInRight(){
        let lineLen = this.state.longestLineLen
        let newFront = this.getBackOriginPosition() + 1
        let newBack = newFront + lineLen
        this.setState({front: newFront, back: newBack})
    }

    shiftUP(){
        let top
        let bottom
        if(this.hasScrolledOffScreenUp()){
            let lineCount = this.state.lineCount
            bottom  = this.getTopOriginPosition() - 1
            top = bottom - lineCount
        }else{
            top = this.state.top + 1
            bottom = this.state.bottom + 1
        }
        this.setState({top:top, bottom:bottom})
    }

    shiftDown(){
        let top
        let bottom
        if(this.hasScrolledOffScreenDown()){
            let lineCount = this.state.lineCount
            top = this.getBottomOriginPosition() + 1
            bottom = top + lineCount
        }else{
            top = this.state.top - 1
            bottom =  this.state.bottom - 1
        }
        this.setState({top:top, bottom:bottom})
    }

    resetImage(){
        let top = this.getTopOriginPosition()
        let bottom = this.getBottomOriginPosition()
        let front = this.getFrontOriginPosition()
        let back = this.getBackOriginPosition()
        this.setState({top: top, bottom: bottom, front: front, back: back}, () => {this.props.resetScrollState(this.randomShift())})
    }


}


export default AsciiCanvas;