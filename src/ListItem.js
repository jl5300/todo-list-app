import React from 'react';
import './ListItem.css';
import l_icon from './images/l_icon.jpg';
import m_icon from './images/m_icon.jpg';
import h_icon from './images/h_icon.jpg';

export default function ListItem(props) {
	const task = props.entry.task;
	const opacity = props.entry.completed ? 0.2 : 1;
	const priorityIcons = [h_icon, m_icon, l_icon];
	const priorityIconShown = priorityIcons[props.entry.priority];

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
					{/* <textarea
						name="description"
						placeholder="Add a description..."
						rows="1"
					/> */}
				</div>
			</div>
			<div className="vertical-line" />
			<div className="buttons">
				<button
					title="Set task priority"
					className="priority-button"
					style={{ backgroundImage: `url(${priorityIconShown})` }}
					onClick={() => props.handlePriorityButton()}
				/>
				<button
					title="Mark/unmark task as completed"
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