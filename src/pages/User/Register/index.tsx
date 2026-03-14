import { LockOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';

export default function Register() {
  const handleSubmit = async (values: any) => {
    // Tạm thời chưa có Backend, mình sẽ Mock báo thành công luôn
    console.log('Dữ liệu đăng ký:', values);
    
    message.success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
    
    // Đăng ký xong thì đẩy người dùng về lại trang Login
    history.push('/user/login');
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100vh', paddingTop: '120px' }}>
      <LoginForm
        title="Đăng Ký Tài Khoản"
        subTitle="Tham gia hệ thống Quản lý Đồ án KTHP"
        onFinish={handleSubmit}
        submitter={{
          searchConfig: {
            submitText: 'Tạo tài khoản',
          },
        }}
      >
        <ProFormText
          name="fullName"
          fieldProps={{ size: 'large', prefix: <IdcardOutlined /> }}
          placeholder="Họ và tên của bạn"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        />
        
        <ProFormText
          name="username"
          fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
          placeholder="Tên đăng nhập (VD: msv_12345)"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        />
        
        <ProFormText.Password
          name="password"
          fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
          placeholder="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        />

        <ProFormSelect
          name="role"
          placeholder="Bạn là ai?"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          options={[
            { label: 'Sinh viên', value: 'STUDENT' },
            { label: 'Giảng viên', value: 'LECTURER' },
            { label: 'Quản lý (Giáo vụ)', value: 'ADMIN' },
          ]}
        />

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <span>Đã có tài khoản? </span>
          <a onClick={() => history.push('/user/login')}>Đăng nhập tại đây</a>
        </div>
      </LoginForm>
    </div>
  );
}