import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import styles from '../stylesheets/modules/InputBar.module.scss'

const InputBar = (props) => {
  const [newTime, setNewTime] = useState(0)
  const [newTask, setNewTask] = useState('')
  const [newTags, setNewTags] = useState([])
  
  const [firstWidth, setFirstWidth] = useState(0)
  const [secondWidth, setSecondWidth] = useState(0)
  const [thirdWidth, setThirdWidth] = useState(0)

  // Temporary fix for setting width of the InputBar's the same as the tables divs.
  useEffect(()=>{
    setFirstWidth(document.getElementById("firstcol").clientWidth)
    setSecondWidth(document.getElementById("secondcol").clientWidth)
    setThirdWidth(document.getElementById("thirdcol").clientWidth)
  }, [])

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
    axios.post('http://localhost:5000/api/items/', data, {
        'Content-Type': 'application/json',
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
        alert(error.message)
      })
      .then((res) => {
        console.log(res)
        // Setting STATE to "not updated" so table component will update
        props.updateHandler(false)})
      /* 
      .catch((error) => {
        console.log(error.message)
        alert("something happened")
      })
      .then((res) => {
        console.log(res)
        // Setting STATE to "not updated" so table component will update
        props.updateHandler(false)
        setNewTime(0)
        setNewTask('')
        setNewTags([])
      }) */


/*       axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */

    // Reset input states
    // DO SOMETHING???
    // setNewTime(0)
    // setNewTask('')
    // setNewTags([])
  }

  return (
      <form onSubmit={onSubmit}>
        <input
          style={{minWidth: firstWidth}}
          className="first"
          // size={5}
          type="text"
          name="InputHr"
          id="InputHr"
          placeholder="1:25 hr"
          // value={newTime} maybe one way of "resetting" after submit
          onChange={onChangeTime}
          required
        />
        <input
          style={{minWidth: secondWidth}}
          className="second"
          // size={19}
          type="text"
          name="InputTask"
          id="InputTask"
          placeholder="write your task..."
          onChange={onChangeTask}
          required
        />
        <input
          style={{minWidth: thirdWidth}}
          className="third"
          // size={15}
          type="text"
          name="InputTags"
          id="InputTags"
          placeholder="put tags"
          onChange={onChangeTags}
          required
        ></input>
        <button 
          className="fourth" 
          type="submit">
          OK
        </button>
      </form>
  )
}

export default InputBar
