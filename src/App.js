import { Route, Routes, Link, useNavigate } from "react-router-dom";
import 'antd/dist/antd.css';
import "./App.css";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import UploadPage from "./components/UploadPage";
import { Button } from "antd";

const App = () => {
	let navigate=useNavigate();

  return (
    <>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <h1><img src="images/icons/logo.png" alt="logo"></img></h1>
          </Link>
          <Button size="large" onClick={()=>{navigate('/upload')}}>상품업로드</Button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="product/:id" element={<ProductPage />} />
      </Routes>

      <div id="footer">
        <div id="footer-area">
          <div className="footer-logo">
            <Link to="/">
              <img src="images/icons/logo.png" alt="footer logo"></img>
            </Link>
          </div>
          <div className="footer-txt">
            <ul>
              <li className="fnb">
                <span><Link>회사소개</Link></span>
                <span><Link>이용약관</Link></span>
                <span><Link>개인정보처리방침</Link></span>
                <span><Link>이메일무단수집거부</Link></span>
              </li>
              <li className="footer-info">
                <span>사업자등록번호 : 302-95-01247</span>
                <span>대표자 : 윤현선</span>
                <span>주소 : 경기도 성남시 수정구 수진2동</span>
              </li>
              <li className="copyright">
                <p>Copyright © 2022 HSinterior All rights reserved</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
