import React, { useState } from 'react'
import './stylesheets/normalize.css'
import './stylesheets/main.scss'

import Header from './Components/Header'
import InputBar from './Components/InputBar'
import TaskList from './Components/TaskList'

const App = () => {
  const [isUpdated, setIsUpdated] = useState(false)

  // Handles state for whether the table is updated or not,
  // basically communicates between components
  const updateHandler = (bool) => {
    setIsUpdated(bool)
  }

  return (
    <div className="app">
      <Header />
      <InputBar updateHandler={updateHandler} />
      <TaskList isUpdated={isUpdated} updateHandler={updateHandler} />
    </div>
  )
}

export default App