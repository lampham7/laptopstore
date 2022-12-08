import React from "react";
import { Link } from 'react-router-dom'
import {baseUrlImg} from "../../configs/configs"
import {product1, saleIcon} from "../../access/data/data"
import {numberWithComas, formatString} from "../../utils/utils"
const ProductItem = ({data,columns}) => {
    return (
        <div className={columns===4?"col col-xs-6 col-sm-6 col-md-6 col-lg-3":"col col-xs-6 col-sm-6 col-md-6 col-lg-6"}>
            <div className={Number(data.discount)!==0?"productList__item discount":"productList__item"}>{/* discount */}
            <Link to={"/product-detail/"+data.id} className="productList__item__link">
                <div className="productList__item__link-img">
                    <img src={`${baseUrlImg}${data.background}`} alt={data.model} />
                </div>
                <div className="productList__item__link__about">
                    <p className="productList__item__link__about-model">
                        {formatString(data.model)}
                    </p>
                    <p className="productList__item__link__about-screen">
                        {formatString(data.screen)}
                    </p>
                    <p className="productList__item__link__about-cpu">
                        {formatString(data.CPU)}
                    </p>
                    <p className="productList__item__link__about-ram">
                        {formatString(data.RAM)}
                    </p>
                </div>
                <div className="productList__item__link-link">
                    <i>Xem chi tiết</i>
                    <span>Đặt hàng</span>
                </div>
            </Link>
            <div className="productList__item__about">
                <p className="productList__item__about-name">
                    {formatString(data.model)}
                </p>
                <p className="productList__item__about__price-old">
                    {Number(data.discount)!==0?numberWithComas(data.price):""}<u>đ</u>
                </p>
                <p className="productList__item__about__price-new">
                    {Number(data.discount)!==0? numberWithComas(Number(data.price)*(100 - Number(data.discount))/100):numberWithComas(data.price)}<u>đ</u>
                </p>
                <span className="productList__item__about__discount">
                    <img
                        src={saleIcon}
                        className="productList__item__about__discount-img"
                        alt=""
                    />
                    <span className="productList__item__about__discount-percent">
                        -{Number(data.discount)!==0?data.discount:"0"}%
                    </span>
                </span>
            </div>
        </div>
        </div>
    );
};

export default ProductItem;
