import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './stylesheets/normalize.css'
import './stylesheets/main.scss'

import Header from './Components/Header'
import InputBar from './Components/InputBar'
import EntryList from './Components/EntryList'

const App = () => {
  const [dbData, setDbData] = useState([])
  const [totTime, setTotTime] = useState(0)

  // Executed once when started up
  useEffect(() => {
    getData()
  }, [])

  // Calculate tot time in list
  useEffect(() => {
    let newTotTime = 0

    dbData.forEach((element) => {
      if (Number.isInteger(element.time)) newTotTime = newTotTime + element.time
    })

    setTotTime(newTotTime)
  }, [dbData])

  // Fetching data for EntryList
  const getData = () => {
    const requestBody = {
      query: `
        query {
          entries {
            _id
            time
            task
            tags
            date
            comment
          }
        }
      `,
    }

    axios
      .post('http://localhost:5000/graphql', requestBody, {
        'Content-Type': 'application/json',
      })
      .then((res) => {
        setDbData(res.data.data.entries.reverse())
      })
      .catch((err) => console.log(err))
  }

  const addData = (newEntry) => {
    // Double reverse kept the order in the list
    const newData = [...dbData.reverse(), newEntry]
    setDbData(newData.reverse())
  }

  // DELETE request, removed for now until implemented in GraphQL
  const delData = (id) => {
    console.log('this id should be deleted: ' + id)
    /*     axios
      .delete('http://localhost:5000/api/items/' + id)
      .then((res) => {
        updateHandler(false)
      })
      .catch((err) => console.log(err)) */
  }

  return (
    <div className="app">
      <Header />
      <InputBar addData={addData} />
      <EntryList dbData={dbData} totTime={totTime} delData={delData} />
    </div>
  )
}

export default App
