
export default function StartPage(props){

    return(
        <div className="startPageContent">
            <span className="startPageTitle">Quizzical</span>
            <span>Wanna try out your Knowledge</span>
            <button className="allButtons startButton" onClick={props.startGame}>Start Quiz</button>
        </div>
    )
}