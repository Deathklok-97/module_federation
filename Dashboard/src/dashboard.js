import NavigationBar from './components/navigation-bar/navigation-bar.js';

const navItems = [ { url: '/home', title: 'home app' }, { url: '/about', title: 'about app' } ];

const url = window.location.pathname;

if(url === '/home') {
    import('HomeApp/HomePage')
    .then(module => {
        const myButton = module.default;
    
        myButton.render();
    });
}
else if (url === '/about') {

    import('AboutApp/AboutPage')
    .then(module => {
        const aboutPage = module.default;

        aboutPage.render();
    })
    .catch(err => console.log);
}

NavigationBar.render(navItems);
