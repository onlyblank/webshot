export default `:root{
	font-size: 62.5%;
	--font-size--small: 1.4rem;
	--font-size--default: 1.6rem;
	--font-size--medium: 2rem;
	--font-size--large: 2.4rem;

	--color-background: #ddd9cd;
	--color-primary-blue: #283f6f;
	--color-secondary-blue: #74acf8;
	--color-primary-red: #764368;
	--color-secondary-red: #bf486b;
}

body {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


main {
	width: 550px;
	font-family: Monsterrat, sans-serif;
	font-size: var(--font-size--default);
}

.task {
	width: inherit;
	padding: 20px 40px;
	box-sizing: border-box;
	background-color: var(--color-background);
	box-shadow: 0 0 0 1px black;
}

.task__code-editor-wrapper {
	margin: .5rem 0 1rem 0;
}

.task__question, .task__annotation {
	font-size: var(--font-size--medium);
}

.CodeMirror {
	height: auto;
	padding: 1rem 0;
	border-radius: 1rem;
	box-shadow: 5px 5px 20px 7px rgba(0, 0, 0, 0.35);
}

/* костыль */
.CodeMirror-scroll {
	height: unset;
	overflow: unset !important;
}

`;
