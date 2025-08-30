export function getNavItems(user) {
  return [
    { type: "section", title: "Main Menu" },
    { type: "link", to: "/", title: "Dashboard", icon: "mdi-view-dashboard" },

    ...(!user
      ? [
          { type: "link", to: "/login", title: "Login", icon: "mdi-login-variant" },
          { type: "link", to: "/register", title: "Register", icon: "mdi-account-plus" },
        ]
      : []),

    {
      type: "group",
      title: "Patient Area",
      icon: "mdi-hospital-box",
      children: [
        { to: "/patient/profile", title: "Profile", icon: "mdi-account-circle" },
        { to: "/patient/appointment", title: "Appointment", icon: "mdi-calendar-check" },
        { to: "/patient/requests", title: "Blood Requests", icon: "mdi-blood-bag" },
      ],
    },
    {
  type: "group",
  title: "MyShop",   // 👉 Mets ici le nom réel de ta boutique
  icon: "mdi-cart",
  children: [
    {to:'/ecommerce/home',title:"Home",icon:"mdi-home-circle"},
    { to: "/ecommerce/products", title: "Products", icon: "mdi-package-variant" },
    { to: "/ecommerce/cart", title: "Cart", icon: "mdi-cart-outline" },
    { to: "/ecommerce/orders", title: "Orders", icon: "mdi-clipboard-list" },
    { to: "/ecommerce/wishlist", title: "Wishlist", icon: "mdi-heart" },
    { to: "/ecommerce/contact", title: "Contact", icon: "mdi-account-box" },
    
  ],
},
  {
  type: "group",
  title: "Settings",   // 👉 Mets ici le nom réel de ta boutique
  icon: "mdi-cog",
  children: [
    {to:'/settings',title:"Profil",icon:"mdi-account-settings-outline"},
  
    
  ],
},

    { type: "link", to: "/about", title: "About Us", icon: "mdi-information" },
    { type: "link", to: "/contact", title: "Contact", icon: "mdi-phone" },
  ];
}
