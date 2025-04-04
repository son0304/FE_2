import { Button, Image, Row, Col, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IProduct } from "../../interface/IProduct";
import { useNavigate } from "react-router-dom";
import { useListResources } from "../../Hooks/useResource";

const ProductClient = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useListResources("products");
  if (isLoading) return <p>...Loading</p>
  const orderNow = (id: any) => {
    navigate(`/order`, { state: { id } });
  }
  return (
    <div style={{ padding: "40px", background: "#F8F9FA" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#2C3E50",
          background: "#ECF0F1",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Danh Sách Sản Phẩm
      </h2>
      <Row gutter={[24, 24]} justify="center">
        {data?.map((product: IProduct) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <Image
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
              }
              style={{
                borderRadius: "10px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                background: "#FFFFFF",
                border: "1px solid #E0E0E0",
                height: "550px",
                display: "flex",
                flexDirection: "column",
              }}
              bodyStyle={{ padding: "20px", flex: "1", display: "flex", flexDirection: "column" }}
            >
              <Card.Meta
                title={
                  <h3
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#34495E",
                      wordBreak: "break-word", // Cho phép xuống dòng
                      whiteSpace: "normal",
                    }}
                  >
                    {product.name}
                  </h3>
                }
                description={
                  <p
                    style={{
                      color: "#E74C3C",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Giá: {product.price.toLocaleString()} VND
                  </p>
                }
              />
              <p
                style={{
                  marginTop: "10px",
                  color: "#7F8C8D",
                  fontSize: "14px",
                  minHeight: "40px",
                  flexGrow: "1",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1, // Giới hạn tối đa 2 dòng
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.description}
              </p>

              {/* Hai nút trên cùng một hàng */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

                <Button onClick={() => orderNow(product.id)} type="primary" block style={{ fontSize: "16px", height: "45px" }}>
                  Đặt ngay
                </Button>

                <Button
                  type="default"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    fontSize: "20px",
                    height: "45px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductClient;
