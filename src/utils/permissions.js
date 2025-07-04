

// export function isAuthorizedRoute(route) {
//   const authStore = useAuthStore()
//   const userPermissions = authStore.user?.permissions || []
  
//   // 1. Vérifier si la route est publique
//   if (route.meta?.public) return true
  
//   // 2. Vérifier les permissions requises
//   const requiredPermissions = route.meta?.permissions || []
  
//   return requiredPermissions.every(perm => 
//     userPermissions.includes(perm)
//   )
// }
export function isAuthorizedRoute(route) {
  return true
}
