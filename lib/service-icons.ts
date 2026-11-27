import {
  BrickWallIcon,
  Building2Icon,
  ClipboardListIcon,
  ConstructionIcon,
  FactoryIcon,
  HammerIcon,
  HardHatIcon,
  LayersIcon,
  PaintRollerIcon,
  PencilRulerIcon,
  RouteIcon,
  RulerIcon,
  TruckIcon,
  WarehouseIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"

// Icons an admin can pick for a service. The database stores the key only, so
// the public site never renders arbitrary icon names.
export const serviceIcons = {
  "building-2": { label: "Building", icon: Building2Icon },
  "hard-hat": { label: "Civil / hard hat", icon: HardHatIcon },
  factory: { label: "Factory", icon: FactoryIcon },
  route: { label: "Road", icon: RouteIcon },
  "paint-roller": { label: "Interior / exterior", icon: PaintRollerIcon },
  ruler: { label: "Structural", icon: RulerIcon },
  "clipboard-list": { label: "Management", icon: ClipboardListIcon },
  wrench: { label: "Renovation", icon: WrenchIcon },
  hammer: { label: "Hammer", icon: HammerIcon },
  construction: { label: "Construction", icon: ConstructionIcon },
  warehouse: { label: "Warehouse", icon: WarehouseIcon },
  layers: { label: "Layers", icon: LayersIcon },
  "brick-wall": { label: "Brick wall", icon: BrickWallIcon },
  "pencil-ruler": { label: "Design", icon: PencilRulerIcon },
  truck: { label: "Logistics", icon: TruckIcon },
} as const satisfies Record<string, { label: string; icon: LucideIcon }>

export type ServiceIconKey = keyof typeof serviceIcons
export const serviceIconKeys = Object.keys(serviceIcons) as [
  ServiceIconKey,
  ...ServiceIconKey[],
]

// Normalizes any stored value to a known key (unknown values fall back).
// Look the icon up as `serviceIcons[toIconKey(value)].icon`.
export function toIconKey(key: string | null | undefined): ServiceIconKey {
  return key && key in serviceIcons ? (key as ServiceIconKey) : "building-2"
}
