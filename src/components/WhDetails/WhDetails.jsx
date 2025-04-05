import './whDetails.scss';

function WhDetails({warehouseDetails}) {
    return (
        <section className="wh-details">
            <div className="wh-details__location">
                <div className="wh-details__address">
                    <label className="wh-details__label">WAREHOUSE ADDRESS:</label>
                    <div className="wh-details__address-block">
                        <span className="wh-details__text">{`${warehouseDetails.address},`}&nbsp;</span>
                        <span className="wh-details__text">{`${warehouseDetails.city}, ${warehouseDetails.country}`}</span>
                    </div>
                </div>
            </div>
            <div className="wh-details__contact-details">
                <div className="wh-details__contact">
                    <label className="wh-details__label">CONTACT NAME:</label>
                    <span className="wh-details__text">{warehouseDetails.contact_name}</span>
                    <span className="wh-details__text">{warehouseDetails.contact_position}</span>
                </div>
                <div className="wh-details__contact-info">
                    <label className="wh-details__label">CONTACT INFORMATION:</label>
                    <span className="wh-details__text">{warehouseDetails.contact_phone}</span>
                    <span className="wh-details__text">{warehouseDetails.contact_email}</span>
                </div>
            </div>
        </section>
    );
}

export default WhDetails;