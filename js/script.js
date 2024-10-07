// Aguarda o carregamento completo do DOM antes de executar qualquer código
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o elemento da lista de tarefas no DOM
    var taskList = document.getElementById('task-list');
    // Seleciona o botão de adicionar tarefa no DOM
    var addTaskBtn = document.getElementById('add-task-btn');
    // Seleciona o campo de entrada de nova tarefa no DOM
    var newTaskInput = document.getElementById('new-task');
    // Seleciona o contêiner de controles de paginação no DOM
    var paginationControls = document.getElementById('pagination-controls');
    // Define quantas tarefas serão exibidas por página
    var tasksPerPage = 5;
    // Contador para atribuir números às tarefas
    var taskCounter = 0;
    // Variável para armazenar a página atual
    var currentPage = 1;
    // Array para armazenar todas as tarefas criadas
    var tasks = [];

    // Adiciona um evento de clique ao botão de adicionar tarefa
    addTaskBtn.addEventListener('click', addTask);

    // Adiciona um evento de tecla pressionada ao campo de nova tarefa
    newTaskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(); // Chama a função de adicionar tarefa ao pressionar Enter
        }
    });

    // Função para adicionar uma nova tarefa
    function addTask() {
        // Obtém o texto da nova tarefa e remove espaços em branco extras
        var taskText = newTaskInput.value.trim();
        // Verifica se o campo de entrada está vazio
        if (taskText === '') {
            alert('Por favor, insira uma tarefa.');
            return;
        }
        // Verifica se a tarefa já existe na lista
        if (isDuplicate(taskText)) {
            alert('Esta tarefa já existe.');
            return;
        }

        // Incrementa o contador de tarefas
        taskCounter++;
        // Cria um novo elemento de tarefa e adiciona à lista de tarefas
        var task = createTaskElement(taskCounter, taskText);
        tasks.push(task);
        // Limpa o campo de entrada de nova tarefa
        newTaskInput.value = '';
        // Atualiza os controles de paginação
        updatePagination();
        // Exibe a página atualizada com a nova tarefa
        showPage(currentPage);
    }

    // Função para criar um elemento de tarefa (li)
    function createTaskElement(number, text) {
        // Cria um elemento de lista (li) para a tarefa
        var li = document.createElement('li');

        // Cria e adiciona o número da tarefa ao li
        var lineNumber = document.createElement('span');
        lineNumber.textContent = number + '. ';
        li.appendChild(lineNumber);

        // Cria e adiciona um checkbox para marcar a tarefa como completa
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('aria-label', 'Marcar tarefa como completa');
        checkbox.addEventListener('change', toggleComplete);
        li.appendChild(checkbox);

        // Cria e adiciona o texto da tarefa ao li
        var span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);

        // Cria e adiciona o botão de editar tarefa ao li
        var editBtn = createButton('Editar', 'edit', 'Editar tarefa', function () {
            editTask(span);
        });
        li.appendChild(editBtn);

        // Cria e adiciona o botão de excluir tarefa ao li
        var deleteBtn = createButton('Excluir', 'delete', 'Excluir tarefa', function () {
            // Remove o elemento da lista
            li.remove();
            // Remove a tarefa do array de tarefas
            tasks = tasks.filter(t => t !== li);
            // Atualiza a paginação e exibe a página atualizada
            updatePagination();
            showPage(currentPage);
        });
        li.appendChild(deleteBtn);

        // Retorna o elemento li criado
        return li;
    }

    // Função para criar um botão com evento associado
    function createButton(text, className, ariaLabel, onClickHandler) {
        // Cria um botão e define suas propriedades
        var button = document.createElement('button');
        button.textContent = text;
        button.classList.add(className);
        button.setAttribute('aria-label', ariaLabel);
        button.addEventListener('click', onClickHandler);
        // Retorna o botão criado
        return button;
    }

    // Função para verificar se uma tarefa com o mesmo texto já existe
    function isDuplicate(taskText) {
        return tasks.some(function (task) {
            return task.querySelector('span:nth-child(3)').textContent === taskText;
        });
    }

    // Função para alternar o estado de conclusão de uma tarefa
    function toggleComplete(event) {
        // Obtém o checkbox que disparou o evento
        var checkbox = event.target;
        // Obtém o elemento li pai do checkbox
        var li = checkbox.parentElement;
        // Adiciona ou remove a classe 'completed' dependendo do estado do checkbox
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    }

    // Função para editar o texto de uma tarefa
    function editTask(span) {
        // Solicita ao usuário o novo texto da tarefa
        var newText = prompt('Edite a tarefa:', span.textContent);
        // Se o novo texto não for nulo, não estiver vazio e não for duplicado, atualiza o texto da tarefa
        if (newText !== null && newText.trim() !== '' && !isDuplicate(newText.trim())) {
            span.textContent = newText.trim();
        } else if (isDuplicate(newText.trim())) {
            alert('Esta tarefa já existe.');
        }
    }

    // Função para atualizar os controles de paginação
    function updatePagination() {
        // Calcula o número de páginas necessárias
        var pageCount = Math.ceil(tasks.length / tasksPerPage);
        // Limpa os controles de paginação atuais
        paginationControls.innerHTML = '';

        // Cria um botão para cada página e adiciona aos controles de paginação
        for (var i = 1; i <= pageCount; i++) {
            var btn = document.createElement('button');
            btn.textContent = i;
            // Marca o botão da página atual como ativo
            if (i === currentPage) {
                btn.classList.add('active');
            }
            // Adiciona um evento para mudar de página ao clicar no botão
            btn.addEventListener('click', function () {
                currentPage = parseInt(this.textContent);
                showPage(currentPage);
            });
            paginationControls.appendChild(btn);
        }
    }

    // Função para exibir uma página específica de tarefas
    function showPage(page) {
        // Limpa a lista de tarefas atual
        taskList.innerHTML = '';
        // Calcula o intervalo de tarefas a serem exibidas na página
        var start = (page - 1) * tasksPerPage;
        var end = start + tasksPerPage;
        // Adiciona as tarefas da página atual à lista
        tasks.slice(start, end).forEach(function (task) {
            taskList.appendChild(task);
        });
    }
});
