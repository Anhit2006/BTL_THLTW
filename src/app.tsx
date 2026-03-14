import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

// 1. DỮ LIỆU KHỞI TẠO
export async function getInitialState(): Promise<any> {
  return {
    name: undefined, 
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAoskVrmFz/BiazfanxmamNRoxxVxka.png',
    role: undefined, 
  };
}

// 2. CẤU HÌNH GIAO DIỆN & LOGIC BẢO VỆ
// Lưu ý: Mình đã thêm biến setInitialState vào đây để lát nữa gọi hàm xóa dữ liệu đăng nhập
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    menu: { locale: false },
    layout: 'mix',
    
    // 🔥 CODE TẠO NÚT ĐĂNG XUẤT Ở ĐÂY
    avatarProps: {
      src: initialState?.avatar,
      title: initialState?.name || 'Khách',
      render: (_, avatarChildren) => {
        // Bọc Avatar bằng Dropdown của Ant Design
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Đăng xuất',
                  onClick: () => {
                    // Bước 1: Xóa trắng thông tin user hiện tại (Set về undefined)
                    setInitialState((s: any) => ({
                      ...s,
                      name: undefined,
                      role: undefined,
                    }));
                    
                    // Bước 2: Đá văng ra ngoài trang Login
                    history.push('/user/login');
                  },
                },
              ],
            }}
          >
            {/* avatarChildren chính là cái hình tròn avatar và tên của bạn */}
            <div style={{ cursor: 'pointer' }}>{avatarChildren}</div>
          </Dropdown>
        );
      },
    },
    
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.role && !location.pathname.startsWith('/user')) {
        history.push('/user/login'); 
      }
    },
  };
};