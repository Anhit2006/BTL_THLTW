import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
// Đã xóa import Guide và styles vì không cần thiết nữa

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center', marginTop: 20 }}>
          Chào mừng đến với Hệ thống Quản lý Đồ án KTHP!
        </Typography.Title>
        <p style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>
          Giao diện đang bị ẩn Menu vì hệ thống chưa nhận diện được quyền (Role) của bạn. <br/>
          Hãy vào file <b>src/app.ts</b> để giả lập quyền đăng nhập nhé!
        </p>
      </Card>
    </PageContainer>
  );
};

export default HomePage;