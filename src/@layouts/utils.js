// export const getComputedNavLinkToProp = computed(() => link => {
//   const props = {
//     target: link.target,
//     rel: link.rel,
//   }
// })
export function getComputedNavLinkToProp(link) {
  const isRouterLink = !!link.to;

  return isRouterLink
    ? { to: link.to }
    : {
        href: link.href ?? '#',
        target: link.target,
        rel: link.rel,
      };
}
