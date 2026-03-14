import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';

export default function Login() {
  const { setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: any) => {
    const { username } = values;

    let userRole = '';
    let fullName = '';

    if (username === 'admin') {
      userRole = 'ADMIN';
      fullName = 'Giáo vụ khoa';
    } else if (username === 'giangvien') {
      userRole = 'LECTURER';
      fullName = 'Giảng viên Hướng dẫn';
    } else if (username === 'sinhvien') {
      userRole = 'STUDENT';
      fullName = 'Sinh viên Chăm chỉ';
    } else {
      message.error('Sai tài khoản! Hãy thử: admin, giangvien, sinhvien');
      return; 
    }

    message.success(`Đăng nhập thành công! Chào ${fullName}`);
    await setInitialState((s: any) => ({
      ...s,
      name: fullName,
      role: userRole,
    }));

    history.push('/home');
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100vh', paddingTop: '120px' }}>
      <LoginForm
        title="Quản lý Đồ án KTHP"
        subTitle="Hệ thống theo dõi tiến độ khóa luận tốt nghiệp"
        onFinish={handleSubmit}
        submitter={{ searchConfig: { submitText: 'Đăng nhập' } }}
      >
        <ProFormText
          name="username"
          fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
          placeholder="Tên đăng nhập (Thử gõ: admin, giangvien, sinhvien)"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
          placeholder="Mật khẩu (Nhập bừa cũng được)"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        />

        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <span>Chưa có tài khoản? </span>
          <a onClick={() => history.push('/user/register')}>Đăng ký ngay</a>
        </div>
      </LoginForm>
    </div>
  );
}