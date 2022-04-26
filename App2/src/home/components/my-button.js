

const Button = {

    render () {
        const button = document.createElement('button');
        const body = document.querySelector('body');

        button.innerHTML = 'I\'m a button';

        body.appendChild(button);

    }
}

export default Button;