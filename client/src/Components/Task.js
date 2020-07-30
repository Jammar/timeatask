import React, { useState } from 'react'

const Task = (props) => {

  const [isExtended, setIsExtended] = useState(false)

  const { data, delData } = props;


  const extendView = () => {
    setIsExtended(!isExtended)
  }

  return (
    <React.Fragment>
      <div className="first">
        {data.time}
      </div>
      <div 
        className="second" 
        onClick={(e)=>{extendView()}}>
        {data.task}
        
        {isExtended &&
        <span className="showId">id: {data._id}</span>}
        
      </div>
      <div className="third">{data.tags}</div>
      <button 
        className="fourth"
        type="button"
        onClick={(e)=>{delData(data._id)}}>
        {/* ✖ */}
        ✕
      </button>
    </React.Fragment>
  )
}

export default Task
