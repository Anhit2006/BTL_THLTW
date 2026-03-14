import { PlusOutlined } from '@ant-design/icons';
import { 
  ActionType, 
  ProColumns, 
  ProTable, 
  ModalForm, 
  ProFormText, 
  ProFormSelect 
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';

// 1. Định nghĩa kiểu dữ liệu
type UserItem = {
  id: number;
  fullName: string;
  username: string;
  role: string;
  status: string;
};

// Dữ liệu mẫu ban đầu
const initialData: UserItem[] = [
  { id: 1, fullName: 'Nguyễn Văn Admin', username: 'admin', role: 'ADMIN', status: 'ACTIVE' },
  { id: 2, fullName: 'Trần Thị Giảng Viên', username: 'giangvien', role: 'LECTURER', status: 'ACTIVE' },
  { id: 3, fullName: 'Lê Văn Sinh Viên', username: 'sinhvien', role: 'STUDENT', status: 'ACTIVE' },
];

export default function ManageUsers() {
  const actionRef = useRef<ActionType>();
  
  // 2. Dùng useState để quản lý dữ liệu bảng (Thêm/Xóa sẽ cập nhật được)
  const [tableData, setTableData] = useState<UserItem[]>(initialData);

  // 3. Cấu hình các cột của bảng
  const columns: ProColumns<UserItem>[] = [
    { title: 'ID', dataIndex: 'id', width: 48, search: false },
    { title: 'Họ và tên', dataIndex: 'fullName', copyable: true },
    { title: 'Tên đăng nhập', dataIndex: 'username' },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        ADMIN: { text: 'Quản trị viên', status: 'Error' },
        LECTURER: { text: 'Giảng viên', status: 'Success' },
        STUDENT: { text: 'Sinh viên', status: 'Processing' },
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      search: false,
      render: (_, record) => (
        <Tag color={record.status === 'ACTIVE' ? 'green' : 'red'}>
          {record.status === 'ACTIVE' ? 'Đang hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => message.info('Tính năng Sửa sẽ làm tương tự Thêm mới!')}>
          Sửa
        </a>,
        <Popconfirm
          key="delete"
          title={`Bạn có chắc chắn muốn xóa ${record.fullName}?`}
          onConfirm={() => {
            // Logic Xóa: Lọc bỏ user có id trùng với id đang bấm
            const newData = tableData.filter(item => item.id !== record.id);
            setTableData(newData);
            message.success('Đã xóa thành công!');
            actionRef.current?.reload(); // Refresh lại bảng
          }}
        >
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<UserItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // Lấy dữ liệu từ state tableData thay vì mock tĩnh
      request={async (params) => {
        let filteredData = [...tableData];
        if (params.fullName) filteredData = filteredData.filter(item => item.fullName.includes(params.fullName as string));
        if (params.username) filteredData = filteredData.filter(item => item.username.includes(params.username as string));
        if (params.role) filteredData = filteredData.filter(item => item.role === params.role);
        
        return { data: filteredData, success: true, total: filteredData.length };
      }}
      rowKey="id"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 5 }}
      headerTitle="Danh sách tài khoản hệ thống"
      
      // 🔥 NÚT THÊM MỚI TÍCH HỢP POPUP FORM Ở ĐÂY 🔥
      toolBarRender={() => [
        <ModalForm
          title="Thêm mới tài khoản"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          }
          modalProps={{ destroyOnClose: true }} // Đóng form là xóa trắng dữ liệu cũ
          onFinish={async (values) => {
            // 1. Tạo user mới từ dữ liệu nhập vào
            const newUser: UserItem = {
              id: Date.now(), // Sinh ID ngẫu nhiên
              fullName: values.fullName,
              username: values.username,
              role: values.role,
              status: 'ACTIVE', // Mặc định là Active
            };
            
            // 2. Thêm vào đầu danh sách hiện tại
            setTableData([newUser, ...tableData]);
            
            // 3. Thông báo và refresh bảng
            message.success('Thêm tài khoản thành công!');
            actionRef.current?.reload();
            return true; // Trả về true để form tự động đóng lại
          }}
        >
          {/* CÁC Ô NHẬP LIỆU CỦA FORM THÊM MỚI */}
          <ProFormText
            name="fullName"
            label="Họ và tên"
            placeholder="Nhập họ và tên..."
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          />
          <ProFormText
            name="username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập..."
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          />
          <ProFormSelect
            name="role"
            label="Vai trò"
            options={[
              { label: 'Quản trị viên', value: 'ADMIN' },
              { label: 'Giảng viên', value: 'LECTURER' },
              { label: 'Sinh viên', value: 'STUDENT' },
            ]}
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          />
        </ModalForm>,
      ]}
    />
  );
}