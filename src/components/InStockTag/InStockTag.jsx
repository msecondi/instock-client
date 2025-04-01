import './inStockTag.scss';

function InStockTag({statusString}) {
    return (
        <div className={`tag ${statusString === 'In Stock' ? "tag--in-stock" : "tag--out-of-stock"}`}>
            <span className={`tag__text `}>{
                statusString === 'In Stock' ? "IN STOCK" : "OUT OF STOCK"}
            </span>
        </div>
    );
}

export default InStockTag;