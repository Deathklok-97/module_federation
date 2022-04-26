
const NavigationBar = {
    render(navItems){

        console.log(navItems);
        const liItems = navItems.map(item => {
            return `
                <li>
                    <a href="${item.url}">${item.title} </a>
                </li>
            `
        })

        const ul = document.createElement('ul');
        ul.innerHTML = liItems.join ('');
        
        document.querySelector('body').appendChild(ul);
    }
}

export default NavigationBar;