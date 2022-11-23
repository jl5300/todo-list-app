import React, { useEffect, useRef, useState } from 'react';
import './ListItem.css';

export default function ListItem(props) {
	const [description, setDescription] = useState('');
	const textAreaRef = useRef();
	const textArea = textAreaRef.current;

	const task = props.entry.task;

	let priorityButtonLabel = "0";
	let priorityButtonStyle = {};

	switch(props.entry.priority) {
		case 0:
			priorityButtonLabel = "H";
			priorityButtonStyle.backgroundColor = "#FF4136";
			break;

		case 1:
			priorityButtonLabel = "M";
			priorityButtonStyle.backgroundColor = "#FFDC00";
			break;

		case 2:
			priorityButtonLabel = "L";
			priorityButtonStyle.backgroundColor = "#0074D9";
			break;

		default:
			console.log("Invalid priority outside 0-2 range");
	}

	// Readjust textArea height on description change
	useEffect(() => {
		if (textArea) {
			// Reset height to get correct scrollHeight for textArea
			textArea.style.height = "0px";

			// Set height to scrollHeight
			textArea.style.height = textArea.scrollHeight + "px";
		}
	}, [textArea, description]);

	return (
		<div className="task-container">
			<div className="text-fields">
				<div className="task-name" data-testid={`todo-list-task-name-${task}`}>
					{task}
				</div>
				<hr className="horizontal" />
				<div className="task-desc">
					<textarea
						ref={textAreaRef}
						name="description"
						placeholder="Add a description..."
						onChange={(event) => setDescription(event.target.value)}
						value={description}
						rows="1"
					/>
				</div>
			</div>
			<div className="vertical-line" />
			<div className="buttons">
				<button
					aria-label="priority"
					title="Set task priority"
					className="priority-button"
					style={priorityButtonStyle}
					onClick={() => props.handlePriorityButton()}
				>
					{priorityButtonLabel}
				</button>
				<button
					title="Mark/unmark task as complete"
					className="check-button"
					onClick={() => props.handleCheckButton()}
				/>
				<button
					title="Permanently delete task"
					className="delete-button"
					onClick={() => props.handleDeleteButton()}
				/>
			</div>
		</div>
	);
}