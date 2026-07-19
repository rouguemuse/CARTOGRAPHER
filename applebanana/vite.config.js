import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to mock the serverless API locally
const mockApiPlugin = () => ({
  name: 'mock-api',
  configureServer(server) {
    server.middlewares.use('/api/subscribe', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { email } = JSON.parse(body || '{}');
          res.setHeader('Content-Type', 'application/json');
          
          if (!email) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Email is required' }));
            return;
          }
          
          // Simulate duplicate email for testing
          if (email === 'test@test.com') {
            res.statusCode = 409;
            res.end(JSON.stringify({ error: 'Duplicate email' }));
            return;
          }
          
          setTimeout(() => {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Success' }));
          }, 1000);
        });
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
})
