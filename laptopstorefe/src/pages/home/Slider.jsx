import React from "react";
import {Link} from "react-router-dom"
import {baseUrlImg} from "../../configs/configs"
import { Swiper, SwiperSlide } from "swiper/react";
import { getBrands } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { Autoplay } from "swiper";
import "swiper/css";
const Slider = () => {
    let brands = useSelector(getBrands);

    return <div className="home__slider">
        {brands.data!==null&&<Swiper
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                }
            }
            modules={[Autoplay]}
            className="mySwiper"
        >
            {brands.data.map(brand=><SwiperSlide key={brand.id}>
                <Link to={"search-products?category-name="+brand.name}>
                    <img src={baseUrlImg+brand.image} alt={brand.name} />
                </Link>
            </SwiperSlide>)}
        </Swiper>}
    </div>;
};

export default Slider;
