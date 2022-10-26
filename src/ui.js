const ui = (() => {
    const setIconTheme = (colors) => {
        const lordIcons = document.querySelectorAll('lord-icon');
        for (let lordIcon of lordIcons) {
            lordIcon.setAttribute('colors', colors);
        }
    };
    const setTheme = (theme) => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (theme === 'dark') { //Match toggle & icons with theme
            themeIcon.checked = true;
            setIconTheme('primary:#3565B0,secondary:#0540A0');
        } else {
            themeIcon.checked = false;
            setIconTheme('primary:#4FDDDE,secondary:#4FAAEF');
        }
    };
    const getTheme = () => { //Use previously used theme
        localStorage.getItem('theme');
        setTheme(localStorage.getItem('theme'));
    };
    return { setTheme, getTheme };
})();

export { ui };