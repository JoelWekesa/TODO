const express = require("express");
const { json, urlencoded } = require("express");

//? APIs
const { registerAPI } = require("./routes/api/register");
const { loginAPI } = require("./routes/api/login");
const { newTodoAPI } = require("./routes/api/newTodo");
const { allTodos } = require("./routes/api/allTodos");
const { userTodos } = require("./routes/api/userTodos");
const { editTodo } = require("./routes/api/editTodo");
//? End of APIs

//? Middleware
const {
	existingUserName,
	existingEmail,
	passwordCheck,
} = require("./middleware/users");
const { contentCheck, isSuperUser, todoUser } = require("./middleware/todos");
const { pageCheck } = require("./middleware/pageCheck");
//? End of middleware

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

//? Routes
app.use(
	"/api/auth/register",
	[existingUserName, existingEmail, passwordCheck],
	registerAPI
);
app.use("/api/auth/login", loginAPI);
app.use("/api/new/todo", [contentCheck], newTodoAPI);
app.use("/api/all/todos", [isSuperUser, pageCheck], allTodos);
app.use("/api/user/todos", [pageCheck, todoUser], userTodos);
app.use("/api/edit/todo", [todoUser], editTodo);

//? End of Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
