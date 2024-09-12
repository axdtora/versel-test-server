import http from 'http';
import { getWeather } from './services/api.service.js';

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Проверяем, что запрос на маршрут /api/weather
    if (url.pathname === '/api/weather' && req.method === 'GET') {
      const city = url.searchParams.get('city') || 'Moscow';
      const weatherData = await getWeather(city); // Получаем данные о погоде
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(weatherData));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Маршрут не найден');
    }
  } catch (error) {
    console.error('Ошибка на сервере:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Ошибка сервера: ${error.message}`);
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
