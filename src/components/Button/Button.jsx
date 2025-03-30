import './button.scss';

function Button({buttonText, imgSrc, buttonType, onClick}) {
    let buttonClass = 'button--primary';

    if (buttonType == 'nav') {
        buttonClass = 'button--nav';
    }

    if (buttonType == 'nav--active') {
        buttonClass = 'button--nav-active';
    }

    if (buttonType == 'secondary') {
        buttonClass = 'button--secondary';
    }   

    if (buttonType == 'delete') { 
        buttonClass = 'button--delete';
    }

    if (buttonType == 'icon-only') {
        buttonClass = 'button--icon-only';
    }

    return ( 
        <button className={`button ${buttonClass} ${imgSrc ? 'button--width-img' : ''}`} onClick={onClick}>
            { imgSrc && (
                <img className="button__img" src={imgSrc} alt="Button Icon"/>
            )}
            <label className={imgSrc ? 'button__text' : ''}>{buttonText}</label>
        </button>
    );
}

export default Button;