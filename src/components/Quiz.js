import he from 'he';

export default function Quiz(props){
    //destructuring props
    const {correct_answer, question, options, choosenAnswer, checkAnswer, buttonClick} = props

    //convert options into button elements
    const buttonElements = options.map(choice => {

        let buttonColor = "";
        let opacityValue = "1";
        //logic to decide on button color
        if(checkAnswer){
            if(choice === correct_answer){
                buttonColor = "#94D7A2";
            }
            else if(choice === choosenAnswer && choice !== correct_answer){
                buttonColor = "#F8BCBC";
                opacityValue = "0.5";
            }
            else {
                buttonColor = "transparent";
                opacityValue = "0.5";
            }
        }
        else {
            choosenAnswer === choice ? buttonColor = "#D6DBF5" : buttonColor = "transparent"
        }
    
        //styles to display button color
        const style= {
            backgroundColor: buttonColor,
            opacity: opacityValue    
        }

        return <button key={choice} 
                value={choice} 
                style={style}
                correct={`${choice === correct_answer}`}
                onClick={buttonClick}
                className="btn quiz-btn"
                >
                    {he.decode(choice)}
                </button>
    })

    return (
        <div className="quiz-tab">
            <p className="quiz-question">{question}</p>
            <div className="quiz-button-container">
                {buttonElements}
            </div>
        </div>
    )
}