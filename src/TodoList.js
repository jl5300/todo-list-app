import ListItem from "./ListItem";
import './TodoList.css';

export default function TodoList(props) {
	const todoList = props.list.map((entry) => {
		const task = entry.task;

		return (
			<ListItem
				task={task}
				handleDeleteButton={() => props.handleDeleteButton(task)}
			/>
		);
	});

	return (<ul className="todo-list">{todoList}</ul>);
}