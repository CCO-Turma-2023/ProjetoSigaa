import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Isso permite que o Vite escute em todos os endereços
    port: 5173, // Certifique-se de que a porta é 5173
  },
});
