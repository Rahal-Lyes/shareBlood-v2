  
export const navItems = [
  { type: 'section', title: 'Main Menu' },
  
  {
    type: 'link',
    to: '/login',
    title: 'Login',
    icon: 'mdi-login-variant',
  },
  
  {
    type: 'link',
    to: '/register',
    title: 'Register',
    icon: 'mdi-account-plus',
  },
  
  {
    type: 'group',
    title: 'Patient Area',
    icon: 'mdi-hospital-box',
    children: [
      { to: '/patient/profile', title: 'Profile', icon: 'mdi-account-circle' },
      { to: '/patient/donations', title: 'My Donations', icon: 'mdi-heart' },
      { to: '/patient/requests', title: 'Blood Requests', icon: 'mdi-blood-bag' },
    ],
  },

  {
    type: 'group',
    title: 'Donor Area',
    icon: 'mdi-account-heart',
    children: [
      { to: '/donor/profile', title: 'Profile', icon: 'mdi-account-circle' },
      { to: '/donor/donate', title: 'Make a Donation', icon: 'mdi-hand-heart' },
      { to: '/donor/history', title: 'Donation History', icon: 'mdi-history' },
    ],
  },

  {
    type: 'link',
    to: '/about',
    title: 'About Us',
    icon: 'mdi-information',
  },

  {
    type: 'link',
    to: '/contact',
    title: 'Contact',
    icon: 'mdi-phone',
  },
];
