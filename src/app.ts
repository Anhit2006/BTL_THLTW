// src/app.ts
import type { RunTimeLayoutConfig } from '@umijs/max';

// ==========================================
// 1. GIẢ LẬP DỮ LIỆU ĐĂNG NHẬP (Lưu vào initialState)
// ==========================================
export async function getInitialState(): Promise<any> {
  // Bình thường chỗ này sẽ là code gọi API fetch thông tin user.
  // Nhưng hiện tại mình đang làm Frontend trước nên sẽ Mock (giả lập) cứng dữ liệu trả về:
  return {
    name: 'Nguyễn Văn Admin', // Tên sẽ hiển thị trên góc phải Header
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAoskVrmFz/BiazfanxmamNRoxxVxka.png',
    
    // 🔥 CHÌA KHÓA HIỂN THỊ MENU LÀ Ở ĐÂY:
    // Hãy thử đổi thành 'ADMIN', 'LECTURER', hoặc 'STUDENT' rồi lưu lại để xem điều kì diệu nhé!
    role: 'LECTURER', 
  };
}

// ==========================================
// 2. CẤU HÌNH GIAO DIỆN (Layout & Header)
// ==========================================
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', // Thay link ảnh logo trường bạn vào đây
    menu: {
      locale: false, 
    },
    layout: 'mix', // Kiểu layout: Có cả thanh Header trên cùng và Menu bên trái
    
    // Cấu hình cục Avatar góc phải trên cùng
    avatarProps: {
      src: initialState?.avatar,
      title: initialState?.name || 'Chưa đăng nhập',
    },
  };
};