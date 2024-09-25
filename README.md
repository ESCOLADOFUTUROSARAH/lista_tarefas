# Lista de Tarefas

Este é um aplicativo simples de Lista de Tarefas desenvolvido em HTML, CSS e JavaScript. O objetivo do projeto é permitir que os usuários adicionem, editem, excluam e finalizem tarefas. Além disso, o aplicativo suporta paginação, dividindo as tarefas em páginas de 5 tarefas cada.

## Funcionalidades

- **Adicionar Tarefa**: Permite ao usuário adicionar uma nova tarefa à lista.
- **Marcar Tarefa como Concluída**: O usuário pode marcar uma tarefa como concluída clicando no checkbox ao lado da tarefa.
- **Editar Tarefa**: O usuário pode editar o texto de uma tarefa existente.
- **Excluir Tarefa**: O usuário pode remover uma tarefa da lista.
- **Paginação**: A lista de tarefas é paginada, com até 5 tarefas por página.
- **Acessibilidade**: O projeto inclui boas práticas de acessibilidade, como o uso de `aria-label` em elementos interativos.
- **Responsividade**: O layout é responsivo e adaptado para diferentes tamanhos de tela.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```plaintext
/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Arquivo CSS para estilização
├── js/
│   └── script.js       # Arquivo JavaScript para a lógica do aplicativo
└── README.md           # Documentação do projeto
```


## Como Usar

- Clone o repositório ou faça o download dos arquivos.
- Abra o arquivo index.html em um navegador de sua preferência.
- Comece a adicionar suas tarefas!

## Personalização

### Modificar o Número de Tarefas por Página

O número de tarefas exibidas por página é controlado pela variável tasksPerPage no arquivo script.js. Para alterar a quantidade, você pode ajustar o valor desta variável.

    var tasksPerPage = 5; // Altere este valor para o número desejado de tarefas por página
