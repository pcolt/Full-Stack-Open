import React from 'react'

const NoteImported = ({ note, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important'
	return (
		<li className='note'>
			{note.content}
			<button className='btnImportant' onClick={toggleImportance}>{label}</button>
		</li>
	)
}

export default NoteImported
