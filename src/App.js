import { useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
	const [activity, setActivity] = useState("");
	const [todos, setTodos] = useState([]);
	const [edit, setEdit] = useState({});
	const [remove, setRemove] = useState(null);
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	function GenerateId() {
		return Date.now();
	}

	function addTodos(event) {
		event.preventDefault();
		const el = document.getElementById("input");
		if (activity.length === 0) {
			el.classList.add("warning");
			inputRef.current.focus();
			return;
		}

		if (edit.id) {
			const newTodo = {
				id: edit.id,
				activity,
			};
			const index = todos.findIndex((todo) => {
				return todo.id === edit.id;
			});
			const updatedTodo = [...todos];
			updatedTodo[index] = newTodo;
			setTodos(updatedTodo);
			setActivity("");
			setEdit({});
			return;
		}
		const newTodo = {
			id: GenerateId(),
			activity,
		};
		setTodos([...todos, newTodo]);
		el.classList.remove("warning");
		inputRef.current.focus();
		setActivity("");
	}

	function editTodo(todo) {
		setActivity(todo.activity);
		setEdit(todo);
		inputRef.current.focus();
	}

	function removeTodo() {
		if (edit.id) {
			inputRef.current.focus();
			return;
		}
		const newTodo = todos.filter((todo) => {
			return todo.id !== remove;
		});
		setTodos(newTodo);
		setRemove(null);
	}
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-700">
			<h1 className="font-Bungee text-5xl py-10">todo list</h1>
			<div className="relative box-shadows w-[600px] h-[75vh] border border-solid border-neutral-200 rounded-xl flex flex-col items-center justify-center shadow-neutral-700 font-">
				{remove && (
					<div className="absolute top-0 left-0 bottom-0 right-0 bg-oren bg-opacity-30 z-10 flex justify-center items-center">
						<div className="font-Ptmono text-white h-[150px] w-[200px] bg-slate-700 rounded-md flex items-center justify-center border border-solid border-white flex-col gap-10">
							<p className="">Are you sure ?</p>
							<div className="flex gap-8">
								<button onClick={setRemove.bind(this, null)}>cancel</button>
								<button onClick={removeTodo} className="text-oren">
									remove
								</button>
							</div>
						</div>
					</div>
				)}
				<div className="flex justify-center items-start h-[100px]">
					<form onSubmit={addTodos}>
						<input
							className="bg-transparent border-0 border-b-2 border-white text-white pb-[5px] mr-[20px] w-[250px] font-Ptmono text-[16px] focus:outline-none"
							type="text"
							placeholder="add todo"
							value={activity}
							ref={inputRef}
							id="input"
							onChange={(event) => {
								setActivity(event.target.value);
							}}
						/>
						<button className="button" type="submit">
							{edit.id ? "save" : "add"}
						</button>
					</form>
					{edit.id && (
						<button
							className="button"
							onClick={() => {
								setEdit({});
								setActivity("");
							}}
						>
							cancel
						</button>
					)}
				</div>
				<div className="color-white h-[300px] pl-[20px] w-[500px] overflow-hidden ">
					<ul className="list-disc  w-[68%] h-full overflow-scroll pr-[250px] pb-[20px] box-content">
						{todos.map((todo) => {
							return (
								<li className="relative" key={todo.id}>
									<input
										className="absolute top-0 left-[1px] peer text-red-600 bg-gray-100 rounded border-gray-300 focus:ring-red-500 accent-oren focus:accent-oren w-9 h-9"
										type="checkbox"
										name="cekbok"
										value=""
										id={todo.id}
									/>
									<label
										htmlFor={todo.id}
										className=" text-white font-Ptmono mb-[20px] py-[5px] pl-[45px] relative flex gap-4 border-[2px] border-oren border-solid rounded-sm peer-checked:border-slate-500 peer-checked:text-slate-500 peer-checked:line-through"
									>
										<p className="m-0">{todo.activity}</p>
									</label>
									<div className="font-Ptmono absolute flex gap-[6px] top-[2px] -right-[147px]">
										<span
											className="text-white border border-white py-[4px] px-[8px] rounded-sm"
											onClick={editTodo.bind(this, todo)}
										>
											edit
										</span>
										<span
											className="text-white border border-white py-[4px] px-[8px] rounded-sm"
											onClick={() => {
												if (!edit.id) {
													setRemove(todo.id);
												}
											}}
										>
											remove
										</span>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
