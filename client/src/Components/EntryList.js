import React from 'react'

import Entry from './Entry'

const EntryList = (props) => {
  const { dbData, totTime, delData } = props

  return (
    <div className="wrapper">
      <div className="first header">TIME</div>
      <div className="second header">TASK</div>
      <div className="third header">TAGS</div>

      {dbData.map((data) => (
        <Entry key={data._id} data={data} delData={delData} />
      ))}
      <div className="first footer" id="firstcol">
        {totTime}
      </div>
      <div className="second footer" id="secondcol">
        tillämpad programmering
      </div>
      <div className="third footer" id="thirdcol">
        ALL TAGS
      </div>
      <div className="fourth footer" id="fourthcol">
        65% out of 10,000
      </div>
    </div>
  )
}

export default EntryList
