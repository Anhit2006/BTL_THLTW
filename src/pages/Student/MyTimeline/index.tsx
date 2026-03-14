import { PageContainer } from '@ant-design/pro-components';
import { Card, Steps, Descriptions, Tag, Timeline, Button, Typography, Divider } from 'antd';
import { 
  CheckCircleOutlined, 
  SyncOutlined, 
  ClockCircleOutlined, 
  FileDoneOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function MyTimeline() {
  return (
    <PageContainer header={{ title: 'Tiến độ Đồ án của tôi' }}>
      
      {/* 1. THÔNG TIN CHUNG CỦA ĐỒ ÁN */}
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Descriptions title="Thông tin Đồ án Tốt nghiệp" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Mã Đồ án">DATN_2026_8832</Descriptions.Item>
          <Descriptions.Item label="Tên Đề tài" span={2}>
            <b>Xây dựng hệ thống Quản lý Đồ án KTHP</b>
          </Descriptions.Item>
          <Descriptions.Item label="Giảng viên HD">PGS.TS. Nguyễn Văn A</Descriptions.Item>
          <Descriptions.Item label="Lĩnh vực">
            <Tag color="blue">Phát triển Web</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái hiện tại">
            <Tag color="processing" icon={<SyncOutlined spin />}>
              Đang thực hiện
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 2. THANH TIẾN TRÌNH TỔNG QUAN (STEPS) */}
      <Card title="Quy trình thực hiện" bordered={false} style={{ marginBottom: 24 }}>
        <Steps
          current={2} // Đang ở bước 3 (Index = 2)
          items={[
            {
              title: 'Đề xuất',
              description: 'Nộp đề cương',
              icon: <CheckCircleOutlined />,
            },
            {
              title: 'Phê duyệt',
              description: 'GV & Khoa duyệt',
              icon: <CheckCircleOutlined />,
            },
            {
              title: 'Thực hiện',
              description: 'Báo cáo giữa kỳ',
              icon: <SyncOutlined spin />, // Icon xoay tròn tạo hiệu ứng đang làm
            },
            {
              title: 'Bảo vệ',
              description: 'Ra hội đồng',
              icon: <ClockCircleOutlined />,
            },
            {
              title: 'Hoàn thành',
              description: 'Nộp bản cứng',
              icon: <FileDoneOutlined />,
            },
          ]}
        />
      </Card>

      {/* 3. NHẬT KÝ CHI TIẾT (TIMELINE) VÀ NÚT NỘP BÀI */}
      <Card title="Nhật ký hoạt động & Nhận xét của Giảng viên" bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{ flex: 1, paddingRight: 40 }}>
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <>
                      <Text strong>14/03/2026 09:00</Text> - <Text type="success">Giảng viên đã duyệt đề cương.</Text>
                      <br/>
                      <Text type="secondary">Nhận xét: "Đề tài có tính thực tiễn cao. Sinh viên bắt tay vào làm chương 1 nhé."</Text>
                    </>
                  ),
                },
                {
                  color: 'green',
                  children: (
                    <>
                      <Text strong>12/03/2026 15:30</Text> - <Text>Bạn đã nộp đơn đề xuất đồ án.</Text>
                      <br/>
                      <Text type="secondary">File đính kèm: De_cuong_chi_tiet_v1.pdf</Text>
                    </>
                  ),
                },
                {
                  color: 'gray',
                  children: (
                    <>
                      <Text strong>10/03/2026 08:00</Text> - <Text>Hệ thống mở đợt đăng ký đồ án kỳ 2.</Text>
                    </>
                  ),
                },
              ]}
            />
          </div>

          <div style={{ width: '300px', borderLeft: '1px solid #f0f0f0', paddingLeft: 24 }}>
            <Title level={5}>Nhiệm vụ tiếp theo</Title>
            <Text type="secondary">Hạn nộp Báo cáo giữa kỳ: <Text type="danger" strong>30/04/2026</Text></Text>
            <Divider style={{ margin: '12px 0' }} />
            <Button type="primary" block icon={<SyncOutlined />}>
              Nộp báo cáo giữa kỳ
            </Button>
            <Button block style={{ marginTop: 12 }}>
              Nhắn tin cho Giảng viên
            </Button>
          </div>
          
        </div>
      </Card>

    </PageContainer>
  );
}