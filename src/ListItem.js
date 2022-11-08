import React from 'react';
import './ListItem.css';

export default function ListItem(props) {
	const task = props.entry.task;
	const opacity = props.entry.completed ? 0.2 : 1;

	return (
		<div className="task-container" style={{ opacity: opacity }}>
			<div className="text-fields">
				<div className="task-name">
					{task}
				</div>
				<hr className="horizontal" />
				<div className="task-desc">
					<input
						type="text"
						placeholder="Add a description..."
					/>
					{/* <div
						role="textbox"
						contentEditable
						aria-multiline="true"
						aria-placeholder="Add a description..."
					/> */}
				</div>
			</div>
			<div className="vertical-line" />
			<div className="buttons">
				<button
					className="check-button"
					onClick={() => props.handleCheckButton()}
				/>
				<button
					className="delete-button"
					onClick={() => props.handleDeleteButton()}
				/>
			</div>
		</div>
	);
}