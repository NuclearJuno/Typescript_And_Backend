import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'junior',
    password: 'senha',
    database: 'my1sql'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});

export default connection;
