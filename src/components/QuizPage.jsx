import React from "react"
import Question from "./Question"
import Swal from 'sweetalert2'
export default function QuizPage(){
    const [hasQuizFinished, setHasQuizFinished]= React.useState(false)
    const apiUrl = 'https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple';
    const [questionsList, setQuestionsList] = React.useState([])
    const [selectedOptions, setSelectedOptions] = React.useState([undefined,undefined,undefined,undefined,undefined])  
    const [reset,setReset] = React.useState(false)

    React.useEffect(()=>{
        console.log("fetching quesion")
        async function fetchQuestions(){
        const response = await fetch(apiUrl);
        const data = await response.json();
        setQuestionsList( data.results)
        }
        
        fetchQuestions()
    } ,[reset])

    const questionsElements = questionsList.map((question,index)=>{
       return <Question  
       key={question.question} 
       data={question} 
       questionNumber={index}
       selectedOption={selectedOptions[index]}
       handleChange={(event)=>handleChange(event,index)}
       hasQuizFinished={hasQuizFinished} />      
    })

    const handleChange = (event,index)=>{
      const value = event.target.value
      setSelectedOptions(prevArray => {
        return prevArray.map((option,ind) => {
          return index === ind?
                 option = value:
                 option
        })
      })
    }

    const buttonClick = ()=>{
      if(hasQuizFinished){
       setHasQuizFinished(false)
       setSelectedOptions([undefined,undefined,undefined,undefined,undefined])
       setReset(prev => !prev)
      }else{
        if(selectedOptions.includes(undefined)){ //check whether the user has selected an option for all answers or not
          // alert("Select an option for each question")
          Swal.fire({
            title: 'Option not Selected',
            text: 'Select an option for each question to continue',
            icon: 'error',
            confirmButtonText: 'Continue',
            customClass: 'swal-wide',
            buttonsStyling: false,
            
          })
        }else{
        setHasQuizFinished(true)
        }
      }
    }

    const calculateScore = () =>{
      let score = 0;
      for(let ind = 0;ind < questionsList.length; ind++){
        questionsList[ind].correct_answer === selectedOptions[ind]?
        score +=1:
        undefined
      }
      return score
    }

    return(
            <>
            {
              questionsList.length>=1 && (  
                <div className="quizContainer">
                  <div className="allQuestions">
                    {questionsElements}
                  </div>
                  <div className = "buttonAndScore">
                    {hasQuizFinished && <span>{`You  Scored ${calculateScore()}/5 correct answers`}</span>}
                    <button className="allButtons checkAnswerButton" 
                    onClick={buttonClick}>
                      {hasQuizFinished?"Play Again":"Check Answers"}
                      </button>
                  </div>
                </div>
                )
            }
            </>
        
    )
}