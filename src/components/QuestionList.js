import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ qList, onQuestionDelete, onUpdate }) {
  
  if(!qList) return <h2>Loading...</h2>

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList.map(item => {
        return (
          <QuestionItem 
            key={`Q${item.id}`} 
            onQuestionDelete={onQuestionDelete} 
            question={item} 
            onUpdate={onUpdate}
          />
        )
      })}
      
      </ul>
    </section>
  );
}

export default QuestionList;
