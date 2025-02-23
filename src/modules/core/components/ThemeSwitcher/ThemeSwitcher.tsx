import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  return (
    <div className={styles.themeSwitcherContainer}>
      <div className={styles.themeSwitcher}>
        <label htmlFor="theme-select" className={styles.themeLabel}>
          Select Theme:
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={handleThemeChange}
          className={styles.themeSelect}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
