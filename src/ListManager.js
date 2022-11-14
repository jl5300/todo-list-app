import React from 'react';
import './ListManager.css';
import ListItem from './ListItem';

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

		this.taskNumber = 0;
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
			this.setState({
				list: this.state.list.slice().reverse(),
			});
		}

		else {
			this.setState({
				list: this.state.list.slice().sort((a, b) => {
					if (a[property] > b[property]) {
						return 1;
					}

					if (a[property] < b[property]) {
						return -1;
					}

					return 0;
				}),
			});

			this.lastSortPressed = property;
		}
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
			currentList[taskPos].priority + 1
		) % 3;

		this.setState({
			list: currentList,
		});
	}

	render() {
		const todoList = this.state.list.map((entry) => {
			const task = entry.task;

			return (
				<li key={task}>
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
						<label>
							{this.state.inputLabel}
						</label>
						<input
							type="text"
							onChange={(e) => this.handleChange(e)}
							value={this.state.currentTask}
						/>
						<input
							className="create-task-button"
							type="submit"
							value="Create new task"
						/>
						<div className="dropdown">
							<button className="dropdown-button">Sort tasks by:</button>
							<div className="dropdown-content">
								<p onClick={() => this.handleSortButton('taskNumber')}>Order added</p>
								<p onClick={() => this.handleSortButton('task')}>Alphabet</p>
								<p onClick={() => this.handleSortButton('priority')}>Priority</p>
								<p onClick={() => this.handleSortButton('completed')}>Completion</p>
							</div>
						</div>
					</form>
				</header>
				<ul className="todo-list">{todoList}</ul>
			</div>
		);
	}
}