import errorGif from './error.gif'
function ErrorMessage() {
    return (
        <img style={{display: 'block', width: '250px', heigth: '250px',
        objectFit: 'contain', margin: '0 auto'}} src={errorGif} alt='Error'/>
    );
}

export default ErrorMessage;