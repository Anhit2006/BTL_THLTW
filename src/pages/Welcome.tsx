import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Quản lý đào tạo và học thuật
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          Ae ơi ae chia việc ở đây nhá
        </Typography.Paragraph>
      </Card>
    </PageContainer>
  );
};

export default Welcome;