import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 dark:focus:ring-primary-400 transition-all duration-150 shadow-md border border-primary-200 dark:border-primary-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 sm:h-7 sm:w-7" />
      ) : (
        <Moon className="h-6 w-6 sm:h-7 sm:w-7" />
      )}
    </button>
  );
}
