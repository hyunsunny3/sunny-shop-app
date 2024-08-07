import { API_URL } from "../config/constants";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";
import axios from "axios";
import { Button, Carousel } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ProductList = () => {
  let navigate=useNavigate();
  let [products, setProducts] = React.useState([]);
  let [banners, setBanners] = React.useState([]);

  useEffect(() => {
    /* products 통신 */
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        return console.log(err);
      });
    /* banners 통신 */  
    axios
    .get(`${API_URL}/banners`)
    .then((res) => {
      setBanners(res.data.banners);
    })
    .catch((err) => {
      return console.log(err);
    });  
  
    }, []);
  if (products.length === 0) {
    return <h1>상품정보를 받고있습니다.</h1>;
  }
  return (
    <>
      <div id="body">
        <Carousel autoplay autoplaySpeed={2000}>
          {banners.map((banner,index)=>{
            return(
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img alt="" src={`${API_URL}/${banner.imageUrl}`} />
                </div>
              </Link>
            )
          })}
        </Carousel>
        <h2>Products</h2>
        <Button size="large" onClick={()=>{navigate('/upload')}}>상품업로드</Button>
        <div id="product-list">
          {products.map((product, idx) => {
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/product/${product.id}`}>
                  <div className="product-img-box">
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
                          src="images/icons/flower.png"
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
export default ProductList;
