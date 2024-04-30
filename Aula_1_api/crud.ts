// Importando bibliotecas necessárias
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Criando aplicação Express
const app = express();
const PORT = 3000;

// Configurando o body-parser para lidar com requisições JSON
app.use(bodyParser.json());

// Dados simulados para o CRUD
let users: { id: number, name: string }[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Rota para listar todos os usuários
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

// Rota para obter um usuário por ID
app.get('/users/:id', (req: Request, res: Response) => {
    // Obtendo o ID do parâmetro da URL
    const userId = parseInt(req.params.id);
    // Procurando o usuário correspondente no array de usuários
    const user = users.find(u => u.id === userId);
    // Verificando se o usuário foi encontrado
    if (user) {
        // Se encontrado, retornando o usuário em formato JSON
        res.json(user);
    } else {
        // Se não encontrado, retornando uma resposta de erro com status 404
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// Rota para adicionar um novo usuário
app.post('/users', (req: Request, res: Response) => {
    // Obtendo os dados do novo usuário do corpo da requisição
    const newUser = req.body;
    // Adicionando o novo usuário ao array de usuários
    users.push(newUser);
    // Retornando o novo usuário adicionado com status 201 (Created)
    res.status(201).json(newUser);
});

// Rota para atualizar um usuário existente
app.put('/users/:id', (req: Request, res: Response) => {
    // Obtendo o ID do usuário a ser atualizado do parâmetro da URL
    const userId = parseInt(req.params.id);
    // Obtendo os novos dados do usuário do corpo da requisição
    const updatedUser = req.body;
    // Procurando o índice do usuário a ser atualizado no array de usuários
    const index = users.findIndex(u => u.id === userId);
    // Verificando se o usuário foi encontrado
    if (index !== -1) {
        // Se encontrado, atualizando os dados do usuário
        users[index] = { ...users[index], ...updatedUser };
        // Retornando os dados do usuário atualizado
        res.json(users[index]);
    } else {
        // Se não encontrado, retornando uma resposta de erro com status 404
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// Rota para excluir um usuário
app.delete('/users/:id', (req: Request, res: Response) => {
    // Obtendo o ID do usuário a ser excluído do parâmetro da URL
    const userId = parseInt(req.params.id);
    // Procurando o índice do usuário a ser excluído no array de usuários
    const index = users.findIndex(u => u.id === userId);
    // Verificando se o usuário foi encontrado
    if (index !== -1) {
        // Se encontrado, removendo o usuário do array de usuários
        users.splice(index, 1);
        // Retornando uma resposta de sucesso com status 204 (No Content)
        res.sendStatus(204);
    } else {
        // Se não encontrado, retornando uma resposta de erro com status 404
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
