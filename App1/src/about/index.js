import main from './main.scss';

console.log('about')

const Button = {

    render () {
        const button = document.createElement('button');
        const body = document.querySelector('body');

        button.innerHTML = 'I am not a button';

        body.appendChild(button);

    }
}

export default Button;