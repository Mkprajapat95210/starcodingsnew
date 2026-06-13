'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
        if (currentTheme) {
            setTheme(currentTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.dispatchEvent(new CustomEvent('themechange', { detail: newTheme }));
    };

    return (
        <button
            onClick={toggleTheme}
            className="tmp-theme-toggle"
            aria-label="Toggle Theme"
            style={{
                background: 'var(--color-primary)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#ffffff',
                fontSize: '16px',
                marginLeft: '15px',
                boxShadow: '0 4px 15px rgba(255, 1, 79, 0.2)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            {theme === 'dark' ? (
                <i className="fa-sharp fa-light fa-sun"></i>
            ) : (
                <i className="fa-sharp fa-light fa-moon"></i>
            )}
        </button>
    );
}
