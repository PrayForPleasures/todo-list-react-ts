import React, { Fragment, useState } from "react";
import "./styles/style.css";

interface Todo {
	text: string;
	complete: boolean;
}

const App = () => {
	const [value, setValue] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);
	const [ind, setInd] = useState<number>(0);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		addTodo(value);
		setValue("");
	};

	const addTodo = (text: string): void => {
		const newTodos: Todo[] = [...todos, { text, complete: false }];
		setTodos(newTodos);
		setInd(ind + 1);
	};
	console.log(todos);

	const completeTodo = (index: number): void => {
		const newTodos: Todo[] = [...todos];
		newTodos[index].complete = !newTodos[index].complete;
		setTodos(newTodos);
	};

	const deleteTodo = (index: number): void => {
		const newTodos: Todo[] = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
		setInd(ind - 1);
	};

	return (
		<div className="container">
			<h1 className="topic">
				Our list contains now <strong>{ind}</strong> deals
			</h1>
			<form className="form" onSubmit={handleSubmit}>
				<input
					className="form__input"
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="enter your deal here"
					required
				/>
				<button className="form__button" type="submit">
					Add Ur Deal
				</button>
			</form>
			<section>
				{todos.map((todo: Todo, index: number) => {
					return (
						<div className="content" key={index}>
							<div
								className="content__text"
								style={{ textDecoration: todo.complete ? "line-through" : "" }}
							>
								{todo.text}
							</div>
							<div className="content__button-box">
								<button type="button" onClick={(): void => completeTodo(index)}>
									{todo.complete ? "Incomplete" : "Complete"}
								</button>
								<button type="button" onClick={(): void => deleteTodo(index)}>
									Delete Deal
								</button>
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
};
export default App;
