import React from 'react';
import './ListManager.css';
import ListItem from './ListItem';

const defaultLabel = `
	Type new tasks in the space below.
`;

export default class ListManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			currentTask: "",
			inputLabel: defaultLabel,
		};

		this.taskNumber = 0;
		this.sortAscending = true;
		this.lastSortPressed = '';
	}

	taskPosInList(task) {
		for (let i in this.state.list) {
			if (this.state.list[i].task === task) {
				return i;
			}
		}

		return -1;
	}

	handleChange(event) {
		this.setState({ currentTask: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const currentTask = this.state.currentTask;

		if (!currentTask) {
			return;
		}

		if (this.taskPosInList(currentTask) !== -1) {
			this.setState({
				inputLabel: `
				The task you tried to add is already in
				the To Do list! Try adding another task.
				`,
			});
			return;
		}

		this.setState({
			list: this.state.list.concat([{
				task: this.state.currentTask,
				taskNumber: this.taskNumber,
				completed: false,
				priority: 1,
			}]),
			currentTask: "",
			inputLabel: defaultLabel,
		});

		this.taskNumber++;
	}

	handleSortButton(property) {
		if (property === this.lastSortPressed) {
			this.sortAscending = !this.sortAscending;
		}

		else {
			this.sortAscending = true;
			this.lastSortPressed = property;
		}

		this.setState({
			list: this.state.list.slice().sort((a, b) => {
				if (a[property] === b[property]) {
					return 0;
				}

				if (this.sortAscending) {
					if (a[property] < b[property]) {
						return -1;
					}

					return 1;
				}

				else {
					if (a[property] < b[property]) {
						return 1;
					}

					return -1;
				}
			})
		});
	}

	handleDeleteButton(task) {
		this.setState({
			list: this.state.list.filter((entry) =>
				entry.task !== task
			),
		});
	}

	handleCheckButton(task) {
		let currentList = this.state.list.slice();
		const taskPos = this.taskPosInList(task);

		currentList[taskPos].completed = !currentList[taskPos].completed;

		this.setState({
			list: currentList,
		});
	}

	handlePriorityButton(task) {
		let currentList = this.state.list.slice();
		const taskPos = this.taskPosInList(task);

		currentList[taskPos].priority = (
			currentList[taskPos].priority === 0 ?
			2 :
			currentList[taskPos].priority - 1
		);

		this.setState({
			list: currentList,
		});
	}

	render() {
		const todoList = this.state.list.map((entry) => {
			const task = entry.task;
			const opacity = entry.completed ? 0.2 : 1;

			return (
				<li key={task} aria-label={task} style={{ opacity: opacity }}>
					<ListItem
						entry={entry}
						handleCheckButton={() => this.handleCheckButton(task)}
						handleDeleteButton={() => this.handleDeleteButton(task)}
						handlePriorityButton={() => this.handlePriorityButton(task)}
					/>
				</li>
			);
		});

		return (
			<div className="site-container">
				<header id="site-header">
					<h1>The Teal To Do List!</h1>
					<form
						className="new-task-form"
						onSubmit={(e) => this.handleSubmit(e)}
					>
						<label htmlFor="task-input">
							{this.state.inputLabel}
						</label>
						<input
							type="text"
							id="task-input"
							onChange={(e) => this.handleChange(e)}
							value={this.state.currentTask}
						/>
						<input
							type="submit"
							value="Create new task"
							className="create-task-button"
						/>
						<div className="dropdown">
							<button className="dropdown-button">Sort tasks by:</button>
							<div className="dropdown-content" aria-label="dropdown" role='list'>
								<p
									id="first-in-list"
									onClick={() => this.handleSortButton('taskNumber')}
								>
									Order added
								</p>
								<p onClick={() => this.handleSortButton('task')}>Alphabet</p>
								<p onClick={() => this.handleSortButton('priority')}>Priority</p>
								<p
									id="last-in-list"
									onClick={() => this.handleSortButton('completed')}
								>
									Completion
								</p>
							</div>
						</div>
					</form>
				</header>
				<ul className="todo-list" aria-label="todo">{todoList}</ul>
			</div>
		);
	}
}