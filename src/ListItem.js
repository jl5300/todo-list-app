import React from 'react';
import './ListItem.css';

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 1,
		}
	}

	handleCheckButton() {
		this.setState({
			opacity:
				this.state.opacity === 1 ?
				0.2 : 1,
		});
	}

	render() {
		return (
			<li key={this.props.task} style={{ opacity: this.state.opacity }}>
				<div className="text-fields">
					<div className="task-name">
						{this.props.task}
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
						onClick={() => this.handleCheckButton()}
					/>
					<button
						className="delete-button"
						onClick={() => this.props.handleDeleteButton()}
					/>
				</div>
			</li>
		);
	}
}