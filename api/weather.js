import http from 'http';
import { getWeather } from './services/api.service.js';

// Создаем сервер для обработки запросов
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Обрабатываем запросы к /api/weather?city=CityName
  if (url.pathname === '/api/weather' && req.method === 'GET') {
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
