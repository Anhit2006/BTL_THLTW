import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Hệ thống Khảo sát & Đánh giá Khóa học
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          Chào mừng Nhóm trưởng! Đây là trang quản trị nội bộ dành cho việc tạo
          và quản lý các đợt khảo sát sinh viên.
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
