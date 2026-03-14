import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Space } from 'antd';

const AccessPage: React.FC = () => {
  // Hàm này lấy danh sách các quyền từ file src/access.ts của chúng ta
  const access = useAccess(); 

  return (
    <PageContainer
      ghost
      header={{
        title: 'Ví dụ về Phân quyền Nút bấm',
      }}
    >
      <Space>
        {/* Bọc component Access bên ngoài, truyền quyền canAdmin vào */}
        <Access accessible={access.canAdmin}>
          <Button type="primary">Chỉ ADMIN mới nhìn thấy nút này</Button>
        </Access>

        {/* Bọc component Access bên ngoài, truyền quyền canLecturer vào */}
        <Access accessible={access.canLecturer}>
          <Button type="default" style={{ borderColor: 'green', color: 'green' }}>
            Chỉ GIẢNG VIÊN mới nhìn thấy nút này
          </Button>
        </Access>

        {/* Bọc component Access bên ngoài, truyền quyền canStudent vào */}
        <Access accessible={access.canStudent}>
          <Button danger>Chỉ SINH VIÊN mới nhìn thấy nút này</Button>
        </Access>
      </Space>
    </PageContainer>
  );
};

export default AccessPage;