import { API_URL } from "../config/constants";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { Carousel } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  let [products, setProducts] = React.useState([]);
  let [banners, setBanners] = React.useState([]);

  useEffect(() => {
    /* products 통신 */
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        products = res.data.product;
        setProducts(products);
      })
      .catch((err) => {
        return console.log(err);
      });
    /* banners 통신 */  
    axios
    .get(`${API_URL}/banners`)
    .then((res) => {
      banners = res.data.banners;
      setBanners(banners);
    })
    .catch((err) => {
      return console.log(err);
    });  
  
    }, []);
  if (products === undefined) {
    return <h1>상품정보를 받고있습니다.</h1>;
  }
  return (
    <>
      <div id="body">
        <Carousel autoplay autoplaySpeed={500}>
          {banners.map((banner,index)=>{
            return(
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} />
                </div>
              </Link>
            )
          })}
        </Carousel>
        <h2>Products</h2>
        <div id="product-list">
          {products.map((product, idx) => {
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/product/${product.id}`}>
                  <div>
                    <img
                      className="product-img"
                      src={`${API_URL}/${product.imageUrl}`}
                      alt={`${product.name}`}
                    />
                  </div>
                  <div className="product-content">
                    <span className="product-name">{`${product.name}`}</span>
                    <span className="product-price">
                      {`${product.price}`}원
                    </span>
                    <div className="product-footer">
                      <div className="product-seller">
                        <img
                          className="product-avatar"
                          src="images/icons/avatar.png"
                          alt=""
                        />
                        {product.seller}
                      </div>
                      <span className="product-date">
                        {`${dayjs(product.createdAt).fromNow()}`}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;
