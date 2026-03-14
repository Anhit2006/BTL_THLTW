import { ProList, ModalForm, ProFormTextArea, ProFormRadio } from '@ant-design/pro-components';
import { Button, Tag, message, Typography, Space, Descriptions } from 'antd';
import { FilePdfOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

// 1. Dữ liệu giả lập (Các đơn xin của Sinh viên gửi lên)
const initialTasks = [
  {
    id: 'TASK_01',
    studentName: 'Lê Văn Sinh Viên',
    studentId: 'MSV_2026_001',
    thesisTitle: 'Xây dựng hệ thống Quản lý Đồ án KTHP',
    category: 'Phát triển Web',
    description: 'Nghiên cứu ReactJS, UmiJS và Ant Design để xây dựng hệ thống quản lý.',
    status: 'PENDING', // Đang chờ duyệt
    date: '12/03/2026 15:30',
  },
  {
    id: 'TASK_02',
    studentName: 'Nguyễn Thị Thu Cúc',
    studentId: 'MSV_2026_089',
    thesisTitle: 'Ứng dụng AI trong nhận diện khuôn mặt',
    category: 'Trí tuệ nhân tạo (AI)',
    description: 'Sử dụng Python và OpenCV để nhận diện sinh viên điểm danh.',
    status: 'APPROVED', // Đã duyệt
    date: '10/03/2026 09:15',
  },
];

export default function ReviewTasks() {
  const [dataSource, setDataSource] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);

  return (
    <div style={{ padding: 24, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={3} style={{ marginBottom: 24 }}>Hồ sơ chờ phê duyệt</Title>
      
      {/* DANH SÁCH CÁC ĐƠN ĐỀ XUẤT */}
      <ProList<any>
        rowKey="id"
        dataSource={dataSource}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'studentName',
            render: (_, row) => (
              <Space size={0}>
                <Text strong>{row.studentName}</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>({row.studentId})</Text>
              </Space>
            ),
          },
          avatar: {
            // Hiển thị Icon File PDF đại diện cho Đề cương
            render: () => <FilePdfOutlined style={{ fontSize: 32, color: '#cf1322' }} />,
          },
          description: {
            dataIndex: 'thesisTitle',
            render: (_, row) => <Text strong style={{ color: '#1890ff' }}>Đề tài: {row.thesisTitle}</Text>,
          },
          subTitle: {
            render: (_, row) => {
              if (row.status === 'PENDING') return <Tag icon={<ClockCircleOutlined />} color="warning">Chờ duyệt</Tag>;
              if (row.status === 'APPROVED') return <Tag icon={<CheckCircleOutlined />} color="success">Đã duyệt</Tag>;
              return <Tag icon={<CloseCircleOutlined />} color="error">Từ chối</Tag>;
            },
          },
          actions: {
            render: (_, row) => [
              row.status === 'PENDING' ? (
                <Button 
                  type="primary" 
                  key="review"
                  onClick={() => {
                    setCurrentTask(row);
                    setIsModalOpen(true);
                  }}
                >
                  Duyệt hồ sơ
                </Button>
              ) : (
                <Button key="view" type="dashed">Xem lại</Button>
              ),
            ],
          },
        }}
      />

      {/* POPUP: FORM CHẤM ĐIỂM & NHẬN XÉT CỦA GIẢNG VIÊN */}
      <ModalForm
        title="Đánh giá Đề xuất Đồ án"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          // Xử lý cập nhật trạng thái khi Giảng viên bấm Lưu
          const newData = dataSource.map(item => {
            if (item.id === currentTask.id) {
              return { ...item, status: values.decision };
            }
            return item;
          });
          setDataSource(newData);
          
          if (values.decision === 'APPROVED') {
            message.success('Đã PHÊ DUYỆT đề tài thành công!');
          } else {
            message.warning('Đã TỪ CHỐI đề tài!');
          }
          return true; // Đóng popup
        }}
      >
        {/* Khung hiển thị thông tin Sinh viên đã nộp (Chỉ đọc) */}
        {currentTask && (
          <Descriptions bordered column={1} size="small" style={{ marginBottom: 24, marginTop: 12 }}>
            <Descriptions.Item label="Sinh viên">{currentTask.studentName} ({currentTask.studentId})</Descriptions.Item>
            <Descriptions.Item label="Tên đề tài"><Text strong>{currentTask.thesisTitle}</Text></Descriptions.Item>
            <Descriptions.Item label="Lĩnh vực">{currentTask.category}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{currentTask.description}</Descriptions.Item>
            <Descriptions.Item label="File đính kèm">
              <a>De_cuong_chi_tiet.pdf</a>
            </Descriptions.Item>
          </Descriptions>
        )}

        {/* Khung nhập liệu dành cho Giảng viên */}
        <ProFormRadio.Group
          name="decision"
          label="Quyết định của Giảng viên"
          rules={[{ required: true, message: 'Vui lòng chọn quyết định!' }]}
          options={[
            { label: 'Đồng ý phê duyệt', value: 'APPROVED' },
            { label: 'Yêu cầu làm lại / Từ chối', value: 'REJECTED' },
          ]}
        />

        <ProFormTextArea
          name="comment"
          label="Nhận xét / Yêu cầu chỉnh sửa"
          placeholder="Nhập nhận xét của thầy/cô để sinh viên sửa lại (nếu có)..."
        />
      </ModalForm>
    </div>
  );
}