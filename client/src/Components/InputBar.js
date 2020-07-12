import React, { useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../stylesheets/modules/InputBar.module.scss'

const InputBar = (props) => {
  const [newTime, setNewTime] = useState(0)
  const [newTask, setNewTask] = useState('')
  const [newTags, setNewTags] = useState([])

  // Set states when [...] dependencies are triggered
  useEffect(() => {
    setNewTime(newTime)
    setNewTask(newTask)
    setNewTags(newTags)
  }, [newTime, newTask, newTags])

  // Change events
  const onChangeTime = (event) => {
    setNewTime(event.target.value)
  }
  const onChangeTask = (event) => {
    setNewTask(event.target.value)
  }
  const onChangeTags = (event) => {
    // Will need to fix this better, what happens with 2 whitespaces for example 
    let tags = event.target.value.split(' ')
    setNewTags(tags)
  }

  // POST request when form is submitted
  const onSubmit = (e) => {
    e.preventDefault()

    // Collecting all the data for the post request
    const data = {
      time: newTime,
      task: newTask,
      tags: newTags,
    }
    console.log(data)

    // Actual POST request
    axios
      .post('http://localhost:5000/api/items/', data, {
        'Content-Type': 'application/json',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    // Setting STATE to "not updated" so table component will update
    props.updateHandler(false)

    // Reset input states 
    // DO SOMETHING???
    // setNewTime(0)
    // setNewTask('')
    // setNewTags([])

  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        className={styles.inputBox}
        size={5}
        type="text"
        name="InputHr"
        id="InputHr"
        placeholder="1:25 hr"
        // value={newTime} maybe one way of "resetting" after submit
        onChange={onChangeTime}
        required
      ></input>
      <input
        className={styles.inputBox}
        size={23}
        type="text"
        name="InputTask"
        id="InputTask"
        placeholder="write your task..."
        onChange={onChangeTask}
        required
      ></input>
      <input
        className={styles.inputBox}
        size={15}
        type="text"
        name="InputTags"
        id="InputTags"
        placeholder="put tags"
        onChange={onChangeTags}
        required
      ></input>
      <button className={styles.submit} type="submit">
        OK
      </button>
    </form>
  )
}

export default InputBar
