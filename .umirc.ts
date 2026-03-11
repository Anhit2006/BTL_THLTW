import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Hệ thống Khảo sát',
  },
  // 1. CHỈNH TIẾNG VIỆT Ở ĐÂY
  locale: {
    default: 'vi-VN',
    antd: true,
    baseNavigator: true,
  },
  // 2. CHỈNH MENU Ở ĐÂY
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [{ path: '/user/login', component: './User/Login' }],
    },
    { path: '/', redirect: '/welcome' },
    {
      path: '/welcome',
      name: 'Trang chủ',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/admin',
      name: 'Quản lý khảo sát',
      icon: 'crown',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/list',
          name: 'Danh sách',
          component: './Admin/SurveyList',
        },
        {
          path: '/admin/create',
          name: 'Tạo mới',
          component: './Admin/CreateSurvey',
        },
      ],
    },
    {
      path: '/student',
      name: 'Khu vực sinh viên',
      icon: 'user',
      routes: [
        {
          path: '/student/list',
          name: 'Khảo sát cần làm',
          component: './Student/SurveyList',
        },
      ],
    },
  ],
  npmClient: 'npm',
});
