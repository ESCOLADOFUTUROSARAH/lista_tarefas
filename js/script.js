document.addEventListener('DOMContentLoaded', function () {
    var taskList = document.getElementById('task-list');
    var addTaskBtn = document.getElementById('add-task-btn');
    var newTaskInput = document.getElementById('new-task');
    var paginationControls = document.getElementById('pagination-controls');
    var tasksPerPage = 5;
    var taskCounter = 0;
    var currentPage = 1;
    var tasks = [];

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        var taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Por favor, insira uma tarefa.');
            return;
        }
        if (isDuplicate(taskText)) {
            alert('Esta tarefa já existe.');
            return;
        }

        taskCounter++;
        var task = createTaskElement(taskCounter, taskText);
        tasks.push(task);
        newTaskInput.value = '';
        updatePagination();
        showPage(currentPage);
    }

    function createTaskElement(number, text) {
        var li = document.createElement('li');

        var lineNumber = document.createElement('span');
        lineNumber.textContent = number + '. ';
        li.appendChild(lineNumber);

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('aria-label', 'Marcar tarefa como completa');
        checkbox.addEventListener('change', toggleComplete);
        li.appendChild(checkbox);

        var span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        var editBtn = createButton('Editar', 'edit', 'Editar tarefa', function () {
            editTask(span);
        });
        li.appendChild(editBtn);

        var deleteBtn = createButton('Excluir', 'delete', 'Excluir tarefa', function () {
            li.remove();
            tasks = tasks.filter(t => t !== li);
            updatePagination();
            showPage(currentPage);
        });
        li.appendChild(deleteBtn);

        return li;
    }

    function createButton(text, className, ariaLabel, onClickHandler) {
        var button = document.createElement('button');
        button.textContent = text;
        button.classList.add(className);
        button.setAttribute('aria-label', ariaLabel);
        button.addEventListener('click', onClickHandler);
        return button;
    }

    function isDuplicate(taskText) {
        return tasks.some(function (task) {
            return task.querySelector('span:nth-child(3)').textContent === taskText;
        });
    }

    function toggleComplete(event) {
        var checkbox = event.target;
        var li = checkbox.parentElement;
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    }

    function editTask(span) {
        var newText = prompt('Edite a tarefa:', span.textContent);
        if (newText !== null && newText.trim() !== '' && !isDuplicate(newText.trim())) {
            span.textContent = newText.trim();
        } else if (isDuplicate(newText.trim())) {
            alert('Esta tarefa já existe.');
        }
    }

    function updatePagination() {
        var pageCount = Math.ceil(tasks.length / tasksPerPage);
        paginationControls.innerHTML = '';

        for (var i = 1; i <= pageCount; i++) {
            var btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', function () {
                currentPage = parseInt(this.textContent);
                showPage(currentPage);
            });
            paginationControls.appendChild(btn);
        }
    }

    function showPage(page) {
        taskList.innerHTML = '';
        var start = (page - 1) * tasksPerPage;
        var end = start + tasksPerPage;
        tasks.slice(start, end).forEach(function (task) {
            taskList.appendChild(task);
        });
    }
});
