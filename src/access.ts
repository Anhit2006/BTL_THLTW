// src/access.ts
export default (initialState: API.UserInfo) => {
  // Lấy quyền của user từ initialState (thường được lưu trong DB dưới dạng 'ADMIN', 'LECTURER', 'STUDENT')
  // Dấu ?. giúp tránh lỗi crash web nếu initialState bị null (chưa đăng nhập)
  const userRole = initialState?.role;

  // Khai báo các biến kiểm tra quyền (true = có quyền, false = không có quyền)
  const canAdmin = !!(initialState && userRole === 'ADMIN');
  const canLecturer = !!(initialState && userRole === 'LECTURER');
  const canStudent = !!(initialState && userRole === 'STUDENT');

  // Return về một object. CÁC KEY NÀY PHẢI KHỚP CHÍNH XÁC VỚI CHỮ BẠN GHI Ở FILE .umirc.ts
  return {
    canAdmin,
    canLecturer,
    canStudent,
  };
};