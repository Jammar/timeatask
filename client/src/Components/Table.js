import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../stylesheets/modules/Table.module.scss'

const Table = (props) => {
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
        setDbData(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <table>
      <thead>
        <tr>
          <th>TIME</th>
          <th>TASK</th>
          <th>TAGS</th>
        </tr>
      </thead>
      <tbody>
        {/* Need to fix id's for td elements too */}
        {dbData.map((data) => (
          <tr key={data.id}>
            <td>{data.time}</td>
            <td>{data.task}</td>
            <td>{data.tags}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>{totTime}</td>
          <td>tillämpad programmering</td>
          <td>ALL TAGS</td>
          <td>65% out of 10,000</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default Table
