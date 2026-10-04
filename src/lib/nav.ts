import type { NavGroup, NavItem, NavLink, SectionId } from './types'

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'links' in item
}

/** Flattens grouped entries into a single list of plain links. */
export function flattenNavLinks(items: NavItem[]): NavLink[] {
  return items.flatMap((item) => (isNavGroup(item) ? item.links : [item]))
}

/** Every section id reachable from the nav, groups included. */
export function navSectionIds(items: NavItem[]): SectionId[] {
  return flattenNavLinks(items).map((link) => link.sectionId)
}
