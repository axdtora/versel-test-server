import http from 'http';
import { getWeather } from './services/api.service.js';
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

// Сохраняем токен API
const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (e) {
    printError(e.message);
  }
};

// Создаем сервер для обработки запросов
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Обрабатываем запросы к /weather?city=CityName
  if (url.pathname === '/weather' && req.method === 'GET') {
    const city = url.searchParams.get('city') || 'Moscow';
    try {
      const weatherData = await getWeather(city);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(weatherData));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Ошибка: ${error.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Маршрут не найден');
  }
});

// Порт для прослушивания
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

// Вызов функции для CLI (можно запускать локально через терминал)
const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.t) {
    return saveToken(args.t);
  }
};

initCLI();
