import ListItem from "./ListItem";
import './TodoList.css';

export default function TodoList(props) {
	const todoList = props.list.map((entry) => {
		const task = entry.task;

		return (
			<li key={task}>
				<ListItem
					entry={entry}
					handleCheckButton={() => props.handleCheckButton(task)}
					handleDeleteButton={() => props.handleDeleteButton(task)}
				/>
			</li>
		);
	});

	return (<ul className="todo-list">{todoList}</ul>);
}