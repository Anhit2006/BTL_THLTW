import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Progress, Space, Tag } from 'antd';
import { MessageOutlined, ProfileOutlined } from '@ant-design/icons';

// 1. Định nghĩa kiểu dữ liệu sinh viên
type StudentItem = {
  id: string;
  studentId: string;
  name: string;
  topic: string;
  progress: number;
  status: string;
};

// 2. Dữ liệu giả lập (Những sinh viên đã được Giảng viên nhận hướng dẫn)
const mockStudents: StudentItem[] = [
  { 
    id: '1', 
    studentId: 'MSV_2026_001', 
    name: 'Lê Văn Sinh Viên', 
    topic: 'Xây dựng hệ thống Quản lý Đồ án KTHP', 
    progress: 45, 
    status: 'DOING' 
  },
  { 
    id: '2', 
    studentId: 'MSV_2026_089', 
    name: 'Nguyễn Thị Thu Cúc', 
    topic: 'Ứng dụng AI trong nhận diện khuôn mặt', 
    progress: 80, 
    status: 'REVIEWING' 
  },
  { 
    id: '3', 
    studentId: 'MSV_2026_102', 
    name: 'Trần Bình Trọng', 
    topic: 'Bảo mật IoT bằng Blockchain', 
    progress: 100, 
    status: 'DONE' 
  },
];

export default function StudentList() {
  // 3. Cấu hình các cột của bảng
  const columns: ProColumns<StudentItem>[] = [
    { 
      title: 'Mã SV', 
      dataIndex: 'studentId', 
      width: 120,
      search: false, // Ẩn tìm kiếm theo cột này
    },
    { 
      title: 'Họ và tên', 
      dataIndex: 'name', 
      copyable: true, // Cho phép copy tên
    },
    { 
      title: 'Đề tài hướng dẫn', 
      dataIndex: 'topic', 
      ellipsis: true, // Nếu tên đề tài dài quá sẽ tự động hiện dấu ...
      search: false,
    },
    {
      title: 'Tiến độ hoàn thành',
      dataIndex: 'progress',
      search: false,
      width: 200,
      render: (_, record) => (
        // Thanh tiến độ cực đẹp của Ant Design
        <Progress 
          percent={record.progress} 
          size="small" 
          status={record.progress === 100 ? 'success' : 'active'} 
        />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        DOING: { text: 'Đang thực hiện', status: 'Processing' }, // Màu xanh dương
        REVIEWING: { text: 'Chờ chấm điểm', status: 'Warning' }, // Màu vàng
        DONE: { text: 'Đã hoàn thành', status: 'Success' },      // Màu xanh lá
      }
    },
    {
      title: 'Hành động',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <Button 
          key="view" 
          type="link" 
          icon={<ProfileOutlined />} 
          onClick={() => message.info(`Đang mở Báo cáo tiến độ của ${record.name}`)}
        >
          Chi tiết
        </Button>,
        <Button 
          key="chat" 
          type="link" 
          icon={<MessageOutlined />} 
          onClick={() => message.info(`Đang mở khung chat với ${record.name}`)}
        >
          Nhắn tin
        </Button>
      ]
    }
  ];

  return (
    <div style={{ padding: 24, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <ProTable<StudentItem>
        headerTitle="Danh sách Sinh viên đang Hướng dẫn"
        cardBordered
        // Lấy dữ liệu mock truyền vào bảng
        request={async (params) => {
          let filteredData = mockStudents;
          // Lọc theo tên nếu giảng viên gõ vào ô tìm kiếm
          if (params.name) {
            filteredData = filteredData.filter(item => item.name.includes(params.name as string));
          }
          if (params.status) {
            filteredData = filteredData.filter(item => item.status === params.status);
          }
          return {
            data: filteredData,
            success: true,
            total: filteredData.length,
          };
        }}
        columns={columns}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{ 
          pageSize: 5 
        }}
        dateFormatter="string"
      />
    </div>
  );
}