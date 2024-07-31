import { useState } from "react";
import "./UploadPage.css";
import axios from "axios";
// import { API_URL } from "../config/constants";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";

const UploadPage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = async (values) => {
    try {
      const price = values.price >= 0 ? values.price : 0; 
      const response = await axios.post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: price,
        imageUrl: imageUrl,
      });
  
      // 응답 처리
      if (response.status === 201) {
        message.success("상품이 성공적으로 등록되었습니다.");
        navigate("/", { replace: true });
      }
    } catch (error) {
      message.error(`상품등록시 에러가 발생했습니다: ${error.message}`);
    }
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      if (response && response.imageUrl) {
        setImageUrl(response.imageUrl);
      } else {
        message.error("이미지 URL을 받을 수 없습니다.");
      }
    }
  };

  return (
    <div id="body">
      <div id="upload-container">
        <Form name="uploadForm" onFinish={onSubmit}>
          <Form.Item
            name="upload"
            label={<div className="upload-label">상품 사진</div>}
          >
            <Upload
              name="image"
              action={`${API_URL}/image`}
              listType="picture"
              showUploadList={false}
              onChange={onChangeImage}
            >
              {imageUrl ? (
                <img id="upload-img" src={`${API_URL}/${imageUrl}`} alt="업로드된 이미지" />
              ) : (
                <div id="upload-img-placeholder">
                  <img src="/images/icons/camera.png" alt="카메라 아이콘" />
                  <span>이미지업로드</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">판매자명</div>}
            name="seller"
            rules={[{ required: true, message: "판매자명을 입력해주세요" }]}
          >
            <Input
              className="upload-name"
              size="large"
              placeholder="판매자명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">상품명</div>}
            rules={[{ required: true, message: "상품명을 입력해주세요" }]}
            name="name"
          >
            <Input
              className="upload-name"
              size="large"
              placeholder="상품명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">판매가</div>}
            rules={[{ required: true, message: "판매가를 입력해주세요" }]}
            name="price"
          >
            <InputNumber
              className="upload-price"
              size="large"
              min={0}
              defaultValue={0}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">상품설명</div>}
            rules={[{ required: true, message: "상품설명을 입력해주세요" }]}
            name="description"
          >
            <Input.TextArea
              size="large"
              id="product-description"
              showCount
              maxLength={300}
              placeholder="상품설명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              상품등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default UploadPage;