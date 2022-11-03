import React from 'react';
import TodoList from './TodoList';
import './ListManager.css';

const defaultLabel = `
	Type new tasks in the space below
	and click the button or press Enter
	to add them to the list.
`;

export default class ListManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			currentTask: "",
			inputLabel: defaultLabel,
		};
	}

	handleChange(event) {
		this.setState({ currentTask: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.currentTask === "") {
			return;
		}

		if (this.state.list.includes(this.state.currentTask)) {
			this.setState({
				inputLabel: `
					The task you tried to add is already in
					the To Do list! Try another task.
				`,
			});
			return;
		}

		this.setState({
			list: this.state.list.concat([{
				task: this.state.currentTask
			}]),
			currentTask: "",
			inputLabel: defaultLabel,
		});
	}

	handleDeleteButton(taskToDelete) {
		let currentList = this.state.list;
		let taskIndex = -1;

		currentList.forEach((entry, index) => {
			if (entry.task === taskToDelete) {
				taskIndex = index;
			}
		});

		if (taskIndex !== -1) {
			currentList.splice(taskIndex, 1);
			this.setState({ list: currentList });
		}

		// this.setState({
		// 	list: this.state.list.filter((entry) =>
		// 		entry.task !== task
		// 	),
		// });
	}

	render() {
		return (
			<div className="site-container">
				<header id="site-header">
					<h1>The Teal To Do List!</h1>
					<form
						className="new-task-form"
						onSubmit={(e) => this.handleSubmit(e)}
					>
						<label>
							{this.state.inputLabel}
						</label>
						<input
							type="text"
							onChange={(e) => this.handleChange(e)}
							value={this.state.currentTask}
						/>
						<input type="submit" value="Create new task" />
					</form>
				</header>
				<TodoList
					list={this.state.list}
					handleDeleteButton={(task) => this.handleDeleteButton(task)}
				/>
			</div>
		);
	}
}