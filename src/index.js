import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import external module for making notes:
import NoteImported from './components/Note'
import axios from 'axios'
import './index.css'
import noteService from './services/notes' // module with backend axios communication 


//initialize an array of objects representing the notes to be displayed:
const oldNotes = [
	{
		id: 1,
		content: 'HTML is esay (old)',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript (old)',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol (old)',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
]

//we could refactor a single note in its own component Note:
const Note = ({ note, toggleImportance }) => {
	return (
		<li>{note.content}</li>
	)
}

//footer with React's inline styles (JavaScript object + style attribute)
const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16,
	}
	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2020</em>	
		</div>
	)
}

const App = (props) => {
	//syntactic sugar for: 
	//const notes = props.notes
	//cool way:
	//const {notes} = props
	//an alternative would be just 'destructuring':
	//const App = ({notes }) => { ...
	//but in order to update page when new notes are added let's add them to the App component's state:
	const [oldNotes, setOldNotes] = useState(props.oldNotes)
	//and let's now use also 'db.json' file for our notes:
	const [notes, setNotes] = useState([])
	//a state storing user-submitted input:
	const [newNote, setNewNote] = useState('a new note...')
	//state of notes to be displayed:
	const [showAll, setShowAll] = useState(true)

	//use axios to talk with json-server
	//longer method:
	/*const promise = axios.get('http://localhost:3001/notes')
	console.log(promise)
	promise.then(response => {
		console.log(response)
	})*/
	//shorter syntax + use of side effects with useEffect() so that it is executed immediately after rendering:
	const hook = () => {
		console.log('effect')
		// axios
		// 	.get('http://localhost:3001/notes')
		noteService
			.getAll()
			// .then(response => {
			// 	console.log('promise fulfilled')
			// 	setNotes(response.data)
			.then(initialNotes => {
				console.log('promise fulfilled')
				setNotes(initialNotes)
			})
	}
	console.log('render', notes.length, 'notes: ', notes)
	//second parameter [] specify that effect runs only with first render of component
	useEffect(hook, [])

	//HTML form for adding new notes
	const addNote = (event) => {
		event.preventDefault()
		console.log('button clicked', event.target)
		//create new object for new note (duplicate) with no id because better sever handle this itself
		const noteObjectDb = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		}
		//new object sent to server with axios and post method	
		axios
			.post('http://localhost:3001/api/notes', noteObjectDb)
			.then(response => {
				console.log(response)
				//let's update state 'notes' with new note saved in 'db.json'
				setNotes(notes.concat(response.data))
				setNewNote('a new note...')
			})
	}

	//event handler to synchronize the changes in the input with the component's state:
	const handleNoteChange = (event) => {
		console.log(event.target.value)
		setNewNote(event.target.value)
	}

	//store a list of all notes to be displayed depending on state 'showAll' is true or false, if false show only notes with important property set to 'true'
	const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

	const toggleImportanceOf = (id) => {
		console.log('importance of ' + id + ' needs to be toggled')
		//or using template string syntax added with ES6
		console.log(`importance of ${id} needs to be toogled`)
		//HTTP request to note's unique URL with PUT to replace entire note with imoportant field toggled
		const url = `http://localhost:3001/api/notes/${id}`
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }
		axios
			.put(url, changedNote)
			.then(response => {
				setNotes(notes.map(note => note.id !== id ? note : response.data))
			})
	}


	return (
		<div>
			<h1>Notes</h1>

			{/*list of notes, first version*/}
			<p>Very first version:</p>
			<ul>
				<li>{oldNotes[0].content}</li>
				<li>{oldNotes[1].content}</li>
				<li>{oldNotes[2].content}</li>
			</ul>

			<p>Second version using map (here 'show all/important' does not work):</p>
			<ul>
				{/*same result as above but with map*/}
				{/*as any JS code in a JSX template it must be wrapped with {}*/}
				{notes.map(note => 
					//list items must have unique key
					<li key={note.id}>{note.content}</li>
				)}
			</ul>


			{/*button to show important/all notes*/}
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all' }
				</button>
			</div>

			<p>Third version refactoring Note in a separate component:</p>
			<ul>
				{notesToShow.map(note =>
					<Note key={note.id} note={note} />	
				)}
			</ul>

			<p>Fourth version uses Note as an external module:</p>
			<ul>
				{notesToShow.map(note =>
					<NoteImported 
						key={note.id} 
						note={note} 
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				)}
			</ul>

			{/*form to add new notes*/}
			<h1>Form</h1>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange}/>
				<button type="submit">save</button>
			</form>

			<Footer />
		</div>
	)
}


ReactDOM.render(
	<React.StrictMode>
		<App oldNotes={oldNotes} />
	</React.StrictMode>,
	document.getElementById('root')
);

//print the ids of each single note object stored in the array 'oldNotes'
const result = oldNotes.map(note => note.id)
console.log("result of map: ", result)
