import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Task from './Task'

/* import '../stylesheets/modules/TableTwo.module.scss' */

const TaskList = (props) => {
  const [dbData, setDbData] = useState([])
  const [totTime, setTotTime] = useState(0)

  const { isUpdated, updateHandler } = props

  // Executed once when started up
  useEffect(() => {
    getData()
  }, [])

  // Calculate tot time in table
  // PLUS update the whole shenanigan (should probably be split up)
  useEffect(() => {
    let newTotTime = 0

    dbData.forEach((element) => {
      if (Number.isInteger(element.time)) newTotTime = newTotTime + element.time
    })

    setTotTime(newTotTime)

    if (!isUpdated) {
      getData()
      updateHandler(true)
    }
    // es-lint seem to think I need all these dependencies
  }, [isUpdated, dbData, updateHandler])

  // Get request
  const getData = () => {
    axios
      .get('http://localhost:5000/api/items')
      .then((res) => {
        console.log(res.data)
        setDbData(res.data.reverse())
      })
      .catch((err) => console.log(err))
  }

  // DELETE request
  const delData = (id) => {
    console.log("this is id: " + id)

    axios
      .delete('http://localhost:5000/api/items/' + id)
      .then((res) => {
        updateHandler(false)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="wrapper">
      <div className="first header">TIME</div>
      <div className="second header">TASK</div>
      <div className="third header">TAGS</div>

      {dbData.map((data) => (
      <Task key={data._id} data={data} delData={delData} />
      ))}
      <div className="first footer" id="firstcol">{totTime}</div>
      <div className="second footer" id="secondcol">tillämpad programmering</div>
      <div className="third footer" id="thirdcol">ALL TAGS</div>
      <div className="fourth footer" id="fourthcol">65% out of 10,000</div>
    </div>
  )
}

export default TaskList
