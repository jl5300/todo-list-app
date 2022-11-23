import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

function setupAndReturnTaskInput() {
	render(<App />);
	return screen.getByLabelText(/type new tasks/i);
}

function addItemToList(inputField, taskName) {
	userEvent.click(inputField);
	userEvent.type(inputField, taskName);
	userEvent.click(screen.getByRole('button', { name: /create/i }));

	return screen.getByRole('listitem', { name: taskName });
}

function getTodoListTasks() {
	return (
		screen.getAllByTestId(
			'todo-list-task-name', { exact: false }
		).map(nameContainer => nameContainer.textContent)
	);
}

describe('Header', () => {
	test('Site header renders', () => {
		expect(setupAndReturnTaskInput()).toBeInTheDocument();
	});
});

describe('List Management', () => {
	test('Form submit adds item to list', () => {
		const taskInput = setupAndReturnTaskInput();
		expect(addItemToList(taskInput, 'a')).toBeInTheDocument();
	});

	test('Delete button removes item from list', () => {
		const taskInput = setupAndReturnTaskInput();
		const listItem = addItemToList(taskInput, 'a');

		userEvent.click(within(listItem).getByRole('button', { name: /delete/i }));
		expect(listItem).not.toBeInTheDocument();
	});
});

describe('List Item', () => {
	test('Check button toggles opacity', () => {
		const taskInput = setupAndReturnTaskInput();
		const listItem = addItemToList(taskInput, 'a');
		const checkButton = within(listItem).getByRole('button', { name: /complete/i });

		userEvent.click(checkButton);
		expect(listItem).toHaveStyle('opacity: 0.2');

		userEvent.click(checkButton);
		expect(listItem).toHaveStyle('opacity: 1');
	});

	test('Priority button rotates values', () => {
		const taskInput = setupAndReturnTaskInput();
		const listItem = addItemToList(taskInput, 'a');
		const priorityButton = within(listItem).getByRole('button', { name: 'priority' });

		expect(priorityButton).toHaveTextContent('M');
		userEvent.click(priorityButton);
		expect(priorityButton).toHaveTextContent('H');
		userEvent.click(priorityButton);
		expect(priorityButton).toHaveTextContent('L');
		userEvent.click(priorityButton);
		expect(priorityButton).toHaveTextContent('M');
	});
});

describe('Sorting', () => {
	// test('Dropdown menu responds to hover', () => {
	// 	/*
	// 	 * To test this feature, refactor code to apply display:block style
	// 	 * to dropdown-contents using onMouseEnter and onMouseLeave HTML
	// 	 * properties in React rather than CSS hover pseudoclass.
	// 	 */
	// });

	test('Order added', () => {
		const taskInput = setupAndReturnTaskInput();
		const sortOptionsList = screen.getByRole('list', { name: 'dropdown' });
		const orderAddedSortButton = within(sortOptionsList).getByText(/order/i);
		const alphabetSortButton = within(sortOptionsList).getByText(/alphabet/i);

		for (let name of ['c', 'a', 'b',]) {
			addItemToList(taskInput, name);
		}

		userEvent.click(orderAddedSortButton);
		expect(getTodoListTasks()).toEqual(['c', 'a', 'b',]);

		userEvent.click(orderAddedSortButton);
		expect(getTodoListTasks()).toEqual(['b', 'a', 'c',]);
	});

	test('Alphabet', () => {
		const taskInput = setupAndReturnTaskInput();
		const alphabetSortButton = within(
			screen.getByRole('list', { name: 'dropdown' })
		).getByText(/alphabet/i);

		for (let name of ['b', 'c', 'a',]) {
			addItemToList(taskInput, name);
		}

		userEvent.click(alphabetSortButton);
		expect(getTodoListTasks()).toEqual(['a', 'b', 'c',]);

		userEvent.click(alphabetSortButton);
		expect(getTodoListTasks()).toEqual(['c', 'b', 'a',]);
	});

	test('Priority', () => {
		const taskInput = setupAndReturnTaskInput();
		const prioritySortButton = within(
			screen.getByRole('list', { name: 'dropdown' })
		).getByText(/priority/i);
		const itemA = addItemToList(taskInput, 'low');
		const itemB = addItemToList(taskInput, 'high');
		addItemToList(taskInput, 'medium');

		for (let i = 0; i < 2; i++) {
			userEvent.click(within(itemA).getByRole('button', { name: 'priority' }));
		}

		userEvent.click(within(itemB).getByRole('button', { name: 'priority' }));

		userEvent.click(prioritySortButton);
		expect(getTodoListTasks()).toEqual(['high', 'medium', 'low',]);

		userEvent.click(prioritySortButton);
		expect(getTodoListTasks()).toEqual(['low', 'medium', 'high',]);
	});

	test('Completion', () => {
		const taskInput = setupAndReturnTaskInput();
		const completionSortButton = within(
			screen.getByRole('list', { name: 'dropdown' })
		).getByText(/completion/i);

		const itemA = addItemToList(taskInput, 'a');

		for (let name of ['b', 'c',]) {
			addItemToList(taskInput, name);
		}

		userEvent.click(within(itemA).getByRole('button', { name: /complete/i }));
		userEvent.click(completionSortButton);
		expect(getTodoListTasks()).toEqual(['b', 'c', 'a',]);

		userEvent.click(completionSortButton);
		expect(getTodoListTasks()).toEqual(['a', 'b', 'c',]);
	});
});