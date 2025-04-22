import './InvDetails.scss';
import InStockTag from '../InStockTag/InStockTag';

function InvDetails({inventoryDetails}) {
    return (
        <section className="inv-details">
                <div className="inv-details__description">
                    <div className="inv-details__description-block">
                        <label className="inv-details__label">ITEM DESCRIPTION:</label>
                        <span className="inv-details__text">{`${inventoryDetails.description}`}&nbsp;</span>
                    </div>
                    <div className="inv-details__description-block">
                        <label className="inv-details__label">CATEGORY:</label>
                        <span className="inv-details__text">{`${inventoryDetails.category}`}</span>
                    </div>
                </div>
            {/* <div className="inv-details__location">
            </div> */}
            <div className="inv-details__status">
                <div className="inv-details__status-block">
                    <div className='inv-details__status-block-individual'>
                        <label className="inv-details__label">STATUS:</label>
                        <InStockTag statusString={inventoryDetails.status} />
                    </div>
                    <div className='inv-details__status-block-individual'>
                        <label className="inv-details__label">WAREHOUSE:</label>
                        <span className="inv-details__text">{inventoryDetails.warehouse_name}</span>
                    </div>
                    {/* <span className="inv-details__text">{inventoryDetails.contact_position}</span> */}
                </div>
                <div className="inv-details__quantity">
                    <label className="inv-details__label">QUANTITY:</label>
                    <span className="inv-details__text">{inventoryDetails.quantity}</span>
                </div>
            </div>
        </section>
    );
}

export default InvDetails;