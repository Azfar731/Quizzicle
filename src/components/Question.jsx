import React from "react"
import {decode} from 'html-entities';
export default function Question({data,questionNumber,selectedOption,handleChange,hasQuizFinished}){
  
    // const handleChange = (event)=>{
    //     console.log(event.target.value)
    //     setSelectedOption(event.target.value)
    // }
   

    const insertElement=(array)=>{
        let randomIndex = Math.floor(Math.random() * 4)
        array.splice(randomIndex,0,data.correct_answer)
    }

    const prepareOptionsList =()=>{       
        const options = data.incorrect_answers.map(inc_answer=>{return inc_answer})
        // console.log("incorrect answers: "+ options)
        insertElement(options)
        return options;
    }

    // const [selectedOption, setSelectedOption] = React.useState("5")
    const [optionList,setOptionList] = React.useState(prepareOptionsList)

    const setClassNames = (option)=>{
        if(hasQuizFinished){
            if(option === selectedOption){
                console.log(option === data)
                return option === data.correct_answer? "radio-button quizFinished correctAnswer" : "radio-button quizFinished wrongAnswer"  
            }else{
                return option === data.correct_answer? "radio-button quizFinished correctAnswer" : "radio-button quizFinished"
            }
        }else{
        return option === selectedOption? "radio-button selectedOption": "radio-button"
        }
    }

    const elementsArray =  optionList.map((option,index)=>{
        // console.log(typeof(selectedOption))
        return <div key={option}>
            <input 
            type="radio" 
            id={`${questionNumber}${index}`}
            name={`option ${questionNumber}`} 
            value={option}
            checked={selectedOption === option}
            onChange={handleChange} />
            <label htmlFor={`${questionNumber}${index}`} className={setClassNames(option)} >{decode(option)}</label>
        </div>
    })

    return(
        <div>
            <span className="question">{decode(data.question)}</span>
            <form className="answersForm">
                {elementsArray}          
            </form>
            <hr />
        </div>
    )
}