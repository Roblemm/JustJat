var body = document.querySelector("body");

var defNavBar = `
<!-- DEFAULT NAVBAR -->
    <header>
        <nav id="navigation">
            <ul>
                <a href="index.html">Home</a>
                <a href="signup.html">Sign Up</a>
                <a href="colorGame.html">Color Game</a>
                <a href="todo.html">Todo List</a>
                <a href="keyboardband.html">Keyboard Band</a>
            </ul>
        </nav>
    </header>
<!-- DEFAULT NAVBAR -->
`
//Add currentPage attribute to current page
var fileName = location.href.split("/").slice(-1)[0];
defNavBar= defNavBar.replace(new RegExp(fileName),`${fileName}" id="currentPage`);
//Add html to page
body.prepend(document.createRange().createContextualFragment(defNavBar));