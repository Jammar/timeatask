import React, { useEffect, useState } from 'react'
import axios from 'axios'

const InputBar = (props) => {
  const [newTime, setNewTime] = useState(0)
  const [newTask, setNewTask] = useState('')
  const [newTags, setNewTags] = useState([])

  const [firstWidth, setFirstWidth] = useState(0)
  const [secondWidth, setSecondWidth] = useState(0)
  const [thirdWidth, setThirdWidth] = useState(0)

  const {addData} = props;

  // Temporary fix for setting width of the InputBar's the same as the tables divs.
  useEffect(() => {
    setFirstWidth(document.getElementById('firstcol').clientWidth)
    setSecondWidth(document.getElementById('secondcol').clientWidth)
    setThirdWidth(document.getElementById('thirdcol').clientWidth)
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
    
    const requestBody = {
      query: `
        mutation {
          createEntry(entryInput: {time: ${newTime}, task: "${newTask}", tags: ["${newTags}"]}) {
            _id
            time
            task
            tags
            date
          }
        }
      `,
    }

    // Actual POST request
    axios
      .post('http://localhost:5000/graphql', requestBody, {
        'Content-Type': 'application/json',
      })
      .then((res) => {
        console.log(res.data.data.createEntry._id)
        console.log(res.data.data.createEntry.date)
        console.log(res.data.data.createEntry.task)
        console.log(res.data.data.createEntry.tags)
        addData(res.data.data.createEntry)
      })
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        style={{ minWidth: firstWidth }}
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
        style={{ minWidth: secondWidth }}
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
        style={{ minWidth: thirdWidth }}
        className="third"
        // size={15}
        type="text"
        name="InputTags"
        id="InputTags"
        placeholder="put tags"
        onChange={onChangeTags}
        required
      ></input>
      <button className="fourth" type="submit">
        OK
      </button>
    </form>
  )
}

export default InputBar
