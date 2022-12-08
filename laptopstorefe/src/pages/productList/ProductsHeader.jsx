import React from "react";

const ProductsHeader = ({onChangeQuantityColumns, columns}) => {
    return <div className="productsHeader__container">
        <div className="productsHeader__heading">
            <p>Sản phẩm</p>
        </div>
        <div className="productsHeader__controls">
            <div className="productsHeader__controls__left">
                <i className='bx bx-filter-alt'></i> 
                Lọc
            </div>
            <div className="productsHeader__controls__right">
                <div className="productsHeader__controls__right__viewMode">
                    <p className="productsHeader__controls__right__viewMode-title">
                        Xem:
                    </p>
                    <span className="productsHeader__controls__right__viewMode-icon" onClick={()=>onChangeQuantityColumns(4)}>
                        <i className={columns===4?'bx bxs-grid active':'bx bxs-grid'}></i>
                    </span>
                    <span className="productsHeader__controls__right__viewMode-icon" onClick={()=>onChangeQuantityColumns(2)}>
                        <i className={columns===2?'bx bx-grid-vertical active':'bx bx-grid-vertical'}></i>
                    </span>
                </div>
                <div className="productsHeader__controls__right__sort">
                    <p className="productsHeader__controls__right__sort-title">
                        Sắp xếp theo
                    </p>
                    <select defaultValue={0}>
                        <option value={0}>Mặc định</option>
                        <option value={-1}>Giá giảm dần</option>
                        <option value={1}>Giá tăng dần</option>
                    </select>
                </div>
            </div>
        </div>
        <hr style={{borderColor:"#f7f7f7"}}/>
    </div>;
};

export default ProductsHeader;
