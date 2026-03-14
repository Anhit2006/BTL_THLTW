import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  
  // 1. ĐÃ ĐỔI TÊN HỆ THỐNG Ở ĐÂY
  layout: {
    title: 'Quản lý Đồ án',
  },
  
  locale: {
    default: 'vi-VN',
    antd: true,
    baseNavigator: true,
  },
  
  // 2. CẤU TRÚC MENU MỚI CHO 3 VAI TRÒ
  routes: [
    {
      path: '/user',
      layout: false, // Tắt thanh menu ở trang đăng nhập
      routes: [{ path: '/user/login', component: './User/Login' },
               { path: '/user/register', component: './User/Register' },
      ],
      
    },
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'Trang chủ',
      icon: 'HomeOutlined', // Icon ngôi nhà
      component: './Home',
    },
    
    // --- KHU VỰC CỦA ADMIN (Giáo vụ khoa) ---
    {
      path: '/admin',
      name: 'Quản trị viên',
      icon: 'CrownOutlined',
      access: 'canAdmin', // Cờ phân quyền (chỉ admin mới thấy menu này)
      routes: [
        {
          path: '/admin/manage-users',
          name: 'Quản lý tài khoản',
          component: './Admin/ManageUsers',
        },
        {
          path: '/admin/manage-periods',
          name: 'Đợt bảo vệ đồ án',
          component: './Admin/ManagePeriods',
        },
      ],
    },
    
    // --- KHU VỰC CỦA GIẢNG VIÊN ---
    {
      path: '/lecturer',
      name: 'Khu vực Giảng viên',
      icon: 'SolutionOutlined',
      access: 'canLecturer', // Chỉ giảng viên mới thấy
      routes: [
        {
          path: '/lecturer/student-list',
          name: 'Sinh viên hướng dẫn',
          component: './Lecturer/StudentList',
        },
        {
          path: '/lecturer/review-tasks',
          name: 'Chấm điểm & Tiến độ',
          component: './Lecturer/ReviewTasks',
        },
      ],
    },

    // --- KHU VỰC CỦA SINH VIÊN ---
    {
      path: '/student',
      name: 'Khu vực Sinh viên',
      icon: 'UserOutlined',
      access: 'canStudent', // Chỉ sinh viên mới thấy
      routes: [
        {
          path: '/student/propose-thesis',
          name: 'Đăng ký đề tài',
          component: './Student/ProposeThesis',
        },
        {
          path: '/student/my-timeline',
          name: 'Tiến độ của tôi',
          component: './Student/MyTimeline',
        },
      ],
    },
  ],
  npmClient: 'npm',
});