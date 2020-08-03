import React, { useState } from 'react'

const Entry = (props) => {
  const [isExtended, setIsExtended] = useState(false)

  const { data, delData } = props

  const extendView = () => {
    setIsExtended(!isExtended)
  }

  const allTags = data.tags.map((tag) => tag + ' ')

  return (
    <React.Fragment>
      <div className="first">{data.time}</div>
      <div
        className="second"
        onClick={(e) => {
          extendView()
        }}
      >
        {data.task}
        {isExtended && (
          <>
            <span className="showId">id: {data._id}</span>
            <span className="showId">date: {data.date}</span>
          </>
        )}
      </div>
      <div className="third">{allTags}</div>
      <button
        className="fourth"
        type="button"
        onClick={(e) => {
          delData(data._id)
        }}
      >
        {/* ✖ */}✕
      </button>
    </React.Fragment>
  )
}

export default Entry
