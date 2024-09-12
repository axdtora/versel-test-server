import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printHelp, printError, printSuccess } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { http } from http;

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		if (req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, World!\n');
		}
	}
})

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не переданг token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранен');
	} catch(e) {
		printError(e.message);
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)
	if (args.h) {
		printHelp();
	}
	if (args.s) {
 
	}
	if (args.t) {
		return saveToken(args.t);
	}
	getWeather('Moscow')
};

const port = versel-test-server.vercel.app;

// Запускаем сервер и слушаем указанный порт
server.listen(port, () => {
    console.log(`Сервер запущен и слушает на порту ${port}`);
});

initCLI();
