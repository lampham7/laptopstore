import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/pages/product/product.css";
import { baseUrlApi } from "../../configs/configs";
import { baseUrlImg } from "../../configs/configs";
import { formatString, numberWithComas } from "../../utils/utils";
import Stars from "./Stars";
const ProductDetail = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState();
    const [productSelected, setProductSelected] = useState();
    useEffect(() => {
        fetch(`${baseUrlApi}products.php?id=${productId}`, {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((res) => {
                    setProductData(res);
                    setProductSelected(res.capacities[0]);
                });
            }
        });
    }, []);
    let sortListPrice =
        productData &&
        productData.capacities.sort((capacity1, capacity2) => {
            if (Number(capacity1.price) > Number(capacity2.price)) {
                return 1;
            } else if (Number(capacity1.price) < Number(capacity2.price)) {
                return -1;
            } else {
                return 0;
            }
        });
    let handleChangeCapacitySelected = (capacity) => {
        setProductSelected(capacity);
    };
    let handleAddToCart = () => {
        if (Number(productSelected.quantity) > 1) {
            let urlParams = `?product_id=${productSelected["product_id"]}&capacity_id=${productSelected["id"]}&quantity=1`;
            let dataBody = {
                discount: productData.discount,
                background: productData.background,
                oldPrice: productSelected.price,
                newPrice:
                    Number(productData.discount) > 0
                        ? (Number(productSelected.price) *
                              (100 - Number(productData.discount))) /
                          100
                        : productSelected.price,
                model: productData.model,
                capacityName: productSelected["capacity_name"],
                quantityRemain: Number(productSelected.quantity) - 1,
            };
            fetch(`${baseUrlApi}carts.php${urlParams}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(dataBody),
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.text().then(res=>alert("Thành công"));
                } else {
                    res.text().then((res) => alert(res));
                }
            });
        } else {
            alert("Số lượng không đủ!");
        }
    };
    return (
        productData && (
            <>
                <div className="productDetail row">
                    <div className="productDetail__left col col-xs-12 col-sm-12 col-md-12 col-lg-5">
                        <div className="productDetail__left__container">
                            <div className="productDetail__left__container__main-picture">
                                <img
                                    src={`${baseUrlImg}${productData.background}`}
                                    alt={productData.model}
                                />
                            </div>
                            <div className="productDetail__left__container__pictures"></div>
                        </div>
                    </div>
                    <div className="productDetail__right col col-xs-12 col-sm-12 col-md-12 col-lg-7">
                        <div className="productDetail__right__container">
                            <div className="productDetail__right__model">
                                {formatString(productData.model)}
                            </div>
                            <div className="productDetail__right__list__newPrice">
                                {numberWithComas(sortListPrice[0].price)}đ{" "}
                                {sortListPrice.length >= 2
                                    ? "- " +
                                      numberWithComas(
                                          sortListPrice[
                                              sortListPrice.length - 1
                                          ].price
                                      ) +
                                      "đ"
                                    : ""}
                            </div>
                            <div className="productDetail__right__stars">
                                <Stars count={9}/>
                                <div className="productDetail__right__stars-quantities">
                                    0 đánh giá
                                </div>
                                <div className="productDetail__right__stars-buyed">
                                    <i class='bx bx-shopping-bag'></i> 0 lượt mua
                                </div>
                            </div>
                            <div className="productDetail__right__oldPrice">
                                <span>
                                    {Number(productData.discount) > 0
                                        ? numberWithComas(
                                              (Number(
                                                  sortListPrice[
                                                      sortListPrice.length - 1
                                                  ].price
                                              ) *
                                                  Number(
                                                      productData.discount
                                                  )) /
                                                  100
                                          ) + "đ"
                                        : ""}
                                </span>{" "}
                                {Number(productData.discount) > 0
                                    ? "Giảm đến " + productData.discount + "%"
                                    : ""}
                            </div>
                            <hr className="productDetail__line"
                            />
                            <div className="productDetail__right__capacities">
                                <div className="productDetail__right__capacities__left">
                                    <p>Chọn dung lượng:</p>
                                </div>
                                <div className="productDetail__right__capacities__right">
                                    {/* <button className="active">
                                        8GB/120GB
                                    </button> */}
                                    {productData.capacities &&
                                        productData.capacities.map(
                                            (capacity) => (
                                                <button
                                                    className={
                                                        productSelected.id ===
                                                        capacity.id
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={
                                                        capacity.id !==
                                                        productSelected.id
                                                            ? () => {
                                                                  handleChangeCapacitySelected(
                                                                      capacity
                                                                  );
                                                              }
                                                            : () => {}
                                                    }
                                                    key={capacity.id}
                                                >
                                                    {capacity["capacity_name"]}
                                                </button>
                                            )
                                        )}
                                </div>
                            </div>
                            <div className="productDetail__right__quantities">
                                <div className="productDetail__right__price__left">
                                    <p>Giá:</p>
                                </div>
                                <div className="productDetail__right__price__right">
                                    <span className="productDetail__right__price__right-current">
                                        {numberWithComas(
                                            Number(productData.discount) > 0
                                                ? (Number(
                                                      productSelected.price
                                                  ) *
                                                      (100 -
                                                          Number(
                                                              productData.discount
                                                          ))) /
                                                      100
                                                : productSelected.price
                                        )}
                                        đ
                                    </span>
                                    <span className="productDetail__right__price__right-old">
                                        {Number(productData.discount) > 0
                                            ? numberWithComas(
                                                  productSelected.price
                                              ) + "đ"
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <div className="productDetail__right__quantities">
                                <div className="productDetail__right__quantities__left">
                                    <p>Số lượng còn:</p>
                                </div>
                                <div className="productDetail__right__quantities__right">
                                    <p>{productSelected.quantity}</p>
                                </div>
                            </div>
                            <div className="productDetail__right__buyNow">
                                <button onClick={handleAddToCart}>
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__navigate">
                    <div className="product__navigate__item">Tổng quan</div>
                    <div className="product__navigate__item active">
                        Đánh giá
                    </div>
                    <div className="product__navigate__item">Hỏi đáp</div>
                    <div className="product__navigate__item">Dành cho bạn</div>
                </div>
                <div className="productAbout">
                    <div className="productAbout__overview">Tổng quan</div>
                    <div className="productAbout__feedback">Đánh giá</div>
                    <div className="productAbout__QA">Hỏi đáp</div>
                    <div className="productAbout__offer">Dành cho bạn</div>
                </div>
            </>
        )
    );
};

export default ProductDetail;
