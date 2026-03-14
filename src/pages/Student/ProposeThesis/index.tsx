import { 
  PageContainer, 
  ProForm, 
  ProFormText, 
  ProFormTextArea, 
  ProFormSelect, 
  ProFormUploadButton 
} from '@ant-design/pro-components';
import { Card, message, Result, Button } from 'antd';
import { useState } from 'react';

export default function ProposeThesis() {
  // Biến trạng thái để kiểm tra xem sinh viên đã nộp đơn thành công chưa
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Xử lý khi bấm nút "Gửi đề xuất"
  const handleSubmit = async (values: any) => {
    console.log('Dữ liệu sinh viên nộp:', values);
    
    // Giả lập thời gian load API 1 giây cho chân thực
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    message.success('Nộp đề xuất thành công!');
    setIsSubmitted(true); // Đổi giao diện sang thông báo thành công
    return true;
  };

  return (
    <PageContainer 
      header={{ title: 'Đăng ký & Đề xuất Đồ án Tốt nghiệp' }}
      content="Vui lòng điền đầy đủ thông tin đề cương chi tiết. Giảng viên sẽ xem xét và phản hồi trong thời gian sớm nhất."
    >
      <Card>
        {/* NẾU ĐÃ NỘP RỒI THÌ HIỆN THÔNG BÁO NÀY */}
        {isSubmitted ? (
          <Result
            status="success"
            title="Đã gửi đề xuất đồ án thành công!"
            subTitle="Mã hồ sơ: 2026_DATN_8832. Giảng viên hướng dẫn sẽ nhận được thông báo của bạn."
            extra={[
              <Button type="primary" key="console" onClick={() => setIsSubmitted(false)}>
                Nộp thêm đề xuất khác
              </Button>,
              <Button key="buy" onClick={() => message.info('Đang chuyển sang trang Theo dõi tiến độ...')}>
                Xem tiến độ phê duyệt
              </Button>,
            ]}
          />
        ) : (
          /* NẾU CHƯA NỘP THÌ HIỆN FORM NÀY */
          <ProForm
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: 'Gửi đề xuất',
                resetText: 'Làm lại',
              },
            }}
          >
            <ProFormText
              name="thesisTitle"
              label="Tên đề tài đồ án"
              placeholder="Nhập tên đề tài (VD: Xây dựng hệ thống quản lý ABC...)"
              rules={[{ required: true, message: 'Bắt buộc phải nhập tên đề tài!' }]}
            />

            <ProFormSelect
              name="lecturer"
              label="Giảng viên Hướng dẫn nguyện vọng 1"
              placeholder="-- Chọn Giảng viên --"
              options={[
                { label: 'PGS.TS. Nguyễn Văn A (Khoa CNTT)', value: 'GV01' },
                { label: 'ThS. Trần Thị B (Khoa ATTT)', value: 'GV02' },
                { label: 'TS. Lê Hoàng C (Khoa CNĐPT)', value: 'GV03' },
              ]}
              rules={[{ required: true, message: 'Vui lòng chọn Giảng viên!' }]}
            />

            <ProFormSelect
              name="category"
              label="Lĩnh vực nghiên cứu"
              options={[
                { label: 'Phát triển Web / Ứng dụng', value: 'WEB' },
                { label: 'Trí tuệ nhân tạo (AI/ML)', value: 'AI' },
                { label: 'An toàn thông tin', value: 'SECURITY' },
                { label: 'Mạng máy tính', value: 'NETWORK' },
              ]}
              rules={[{ required: true }]}
            />

            <ProFormTextArea
              name="description"
              label="Tóm tắt nội dung / Mục tiêu đề tài"
              placeholder="Trình bày ngắn gọn mục tiêu, công nghệ sử dụng và kết quả dự kiến (khoảng 100-200 chữ)..."
              rules={[{ required: true, message: 'Vui lòng nhập tóm tắt nội dung!' }]}
            />

            {/* Nút Upload file cực xịn */}
            <ProFormUploadButton
              name="attachment"
              label="Tài liệu đính kèm (Đề cương chi tiết)"
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'text',
              }}
              title="Click để tải file lên (PDF, Word)"
              extra="Vui lòng đính kèm file đề cương chi tiết để Giảng viên đánh giá."
            />
          </ProForm>
        )}
      </Card>
    </PageContainer>
  );
}