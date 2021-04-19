

class Line{


    constructor(baseText) {
        this.text = baseText
        // Text should be set before this is called
        this.front = this.getFrontOriginPosition()
        this.back = this.getBackOriginPosition()
        this.lineLength = baseText.length
    }

    getText(){
        let str = ""
        for(let i = this.front; i <= this.back; i++){
            str += this.getCharAt(i)
        }
        return str
    }

    getCharAt(index){
        if(index < this.getFrontOriginPosition() || index > this.getBackOriginPosition())
            return " "
        return this.text[index]

    }

    getFrontOriginPosition(){ return 0 }
    getBackOriginPosition(){ return this.text.length - 1 }

    isAtOrigin(){
        return this.front === this.getFrontOriginPosition() && this.back === this.getBackOriginPosition()
    }

    hasScrolledOffScreenLeft(){
        // true when front has moved passed backOriginPoint
        return this.front > this.getBackOriginPosition()
    }

    hasScrolledOffScreenRight(){
        // true when back has moved passed frontOriginPoint
        return this.back < this.getFrontOriginPosition()
    }

    shiftLeft(){
        if(!this.hasScrolledOffScreenLeft()){
            // Text Scrolls Left so front/back move right
            this.front++
            this.back++
        }
    }

    shiftRight(){
        if(!this.hasScrolledOffScreenRight()){
            // Text Scrolls Right so front/back move left
            this.front--
            this.back--
        }
    }
} export default Line