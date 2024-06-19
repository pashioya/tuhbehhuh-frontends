import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './setupTest.ts',
        exclude: [...configDefaults.exclude, '**/tests/**'], // exclude playwright tests
    },
})
