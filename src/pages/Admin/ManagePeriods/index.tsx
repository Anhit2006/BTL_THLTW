import { PlusOutlined } from '@ant-design/icons';
import { 
  ActionType, 
  ProColumns, 
  ProTable, 
  ModalForm, 
  ProFormText, 
  ProFormDateRangePicker,
  ProFormSelect
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag } from 'antd';
import { useRef, useState } from 'react';

// 1. Định nghĩa dữ liệu Đợt bảo vệ
type PeriodItem = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'OPEN' | 'CLOSED' | 'UPCOMING';
};

// Dữ liệu mẫu ban đầu
const initialPeriods: PeriodItem[] = [
  { id: 1, name: 'Đồ án Tốt nghiệp Kỳ 1 (2025-2026)', startDate: '2025-09-01', endDate: '2025-12-30', status: 'CLOSED' },
  { id: 2, name: 'Đồ án Tốt nghiệp Kỳ 2 (2025-2026)', startDate: '2026-03-01', endDate: '2026-06-30', status: 'OPEN' },
  { id: 3, name: 'Đồ án Tốt nghiệp Kỳ Hè (2025-2026)', startDate: '2026-07-01', endDate: '2026-08-30', status: 'UPCOMING' },
];

export default function ManagePeriods() {
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState<PeriodItem[]>(initialPeriods);

  // 2. Cấu hình cột hiển thị
  const columns: ProColumns<PeriodItem>[] = [
    { title: 'ID', dataIndex: 'id', width: 48, search: false },
    { 
      title: 'Tên đợt làm đồ án', 
      dataIndex: 'name', 
      copyable: true,
      width: '30%'
    },
    { 
      title: 'Ngày bắt đầu', 
      dataIndex: 'startDate', 
      valueType: 'date',
      search: false,
    },
    { 
      title: 'Ngày kết thúc', 
      dataIndex: 'endDate', 
      valueType: 'date',
      search: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        UPCOMING: { text: 'Sắp diễn ra', status: 'Default' }, // Màu xám
        OPEN: { text: 'Đang mở', status: 'Success' },         // Màu xanh lá
        CLOSED: { text: 'Đã đóng', status: 'Error' },         // Màu đỏ
      },
      render: (_, record) => {
        let color = 'default';
        let text = 'Sắp diễn ra';
        if (record.status === 'OPEN') { color = 'green'; text = 'Đang mở'; }
        else if (record.status === 'CLOSED') { color = 'red'; text = 'Đã đóng'; }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => message.info('Tính năng Sửa đợt đang phát triển')}>Sửa</a>,
        <Popconfirm
          key="delete"
          title={`Bạn có chắc muốn xóa đợt: ${record.name}?`}
          onConfirm={() => {
            const newData = tableData.filter(item => item.id !== record.id);
            setTableData(newData);
            message.success('Đã xóa đợt thành công!');
          }}
        >
          <a style={{ color: 'red' }}>Xóa</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<PeriodItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        let filteredData = [...tableData];
        if (params.name) filteredData = filteredData.filter(item => item.name.includes(params.name as string));
        if (params.status) filteredData = filteredData.filter(item => item.status === params.status);
        
        return { data: filteredData, success: true, total: filteredData.length };
      }}
      rowKey="id"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 5 }}
      headerTitle="Danh sách các đợt làm đồ án"
      
      // 🔥 NÚT THÊM MỚI KÈM CHỌN NGÀY THÁNG 🔥
      toolBarRender={() => [
        <ModalForm
          title="Mở đợt làm đồ án mới"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Tạo đợt mới
            </Button>
          }
          modalProps={{ destroyOnClose: true }}
          onFinish={async (values) => {
            // values.dateRange là một mảng chứa 2 ngày: [Ngày bắt đầu, Ngày kết thúc]
            const startDate = values.dateRange ? values.dateRange[0] : '';
            const endDate = values.dateRange ? values.dateRange[1] : '';

            const newPeriod: PeriodItem = {
              id: Date.now(),
              name: values.name,
              startDate: startDate,
              endDate: endDate,
              status: values.status || 'UPCOMING',
            };
            
            setTableData([newPeriod, ...tableData]);
            message.success('Đã tạo đợt làm đồ án mới!');
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="Tên đợt đồ án"
            placeholder="VD: Đợt 1 Học kỳ 1 Năm 2026..."
            rules={[{ required: true, message: 'Vui lòng nhập tên đợt!' }]}
          />
          
          {/* Bộ chọn khoảng thời gian cực xịn */}
          <ProFormDateRangePicker
            name="dateRange"
            label="Thời gian diễn ra"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu và kết thúc!' }]}
          />

          <ProFormSelect
            name="status"
            label="Trạng thái ban đầu"
            options={[
              { label: 'Sắp diễn ra', value: 'UPCOMING' },
              { label: 'Mở đăng ký ngay', value: 'OPEN' },
            ]}
            initialValue="UPCOMING"
            rules={[{ required: true }]}
          />
        </ModalForm>,
      ]}
    />
  );
}