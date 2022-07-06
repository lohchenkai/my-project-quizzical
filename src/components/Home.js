export default function Home(props){
    return (
        <div className="home">
            <h1 className="home-title">Quizzical</h1>
            <h2 className="home-description">Some description if needed</h2>
            <button onClick={props.startQuiz} className="home-btn btn">Start Quiz</button>
        </div>
    )
}