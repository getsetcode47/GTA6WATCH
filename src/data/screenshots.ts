/**
 * Official GTA VI screenshots from rockstargames.com/VI/media/screenshots,
 * self-hosted under /screenshots (full = ~1600px, thumb = ~640px). Grouped by
 * the categories Rockstar published them under (characters + locations).
 */
export type ShotCategory = 'characters' | 'locations'

export interface Screenshot {
  /** filename stem under /screenshots/full and /screenshots/thumb */
  file: string
  category: ShotCategory
  group: string
  alt: string
}

const shot = (file: string, category: ShotCategory, group: string, alt: string): Screenshot => ({
  file,
  category,
  group,
  alt,
})

export const SCREENSHOTS: Screenshot[] = [
  // ---- Characters ----
  shot('Lucia_Caminos_01', 'characters', 'Lucia Caminos', 'Lucia Caminos training at a boxing gym in GTA VI'),
  shot('Lucia_Caminos_02', 'characters', 'Lucia Caminos', 'Lucia Caminos in Vice City — official GTA VI screenshot'),
  shot('Lucia_Caminos_03', 'characters', 'Lucia Caminos', 'Lucia Caminos portrait — official GTA VI screenshot'),
  shot('Lucia_Caminos_05', 'characters', 'Lucia Caminos', 'Lucia Caminos in GTA VI'),
  shot('Lucia_Caminos_06', 'characters', 'Lucia Caminos', 'Lucia Caminos — official GTA VI screenshot'),
  shot('Jason_Duval_01', 'characters', 'Jason Duval', 'Jason Duval in the Leonida Keys — official GTA VI screenshot'),
  shot('Jason_Duval_03', 'characters', 'Jason Duval', 'Jason Duval in GTA VI'),
  shot('Jason_Duval_05', 'characters', 'Jason Duval', 'Jason Duval — official GTA VI screenshot'),
  shot('Boobie_Ike_01', 'characters', 'Boobie Ike', 'Boobie Ike, Vice City legend — official GTA VI screenshot'),
  shot('Boobie_Ike_02', 'characters', 'Boobie Ike', 'Boobie Ike in his recording studio — GTA VI'),
  shot('DreQuan_Priest_03', 'characters', 'Dre’Quan Priest', 'Dre’Quan Priest, music mogul — official GTA VI screenshot'),
  shot('Real_Dimez_01', 'characters', 'Real Dimez', 'Real Dimez — Bae-Luxe and Roxy — official GTA VI screenshot'),
  shot('Real_Dimez_02', 'characters', 'Real Dimez', 'Real Dimez performing — GTA VI'),
  shot('Real_Dimez_03', 'characters', 'Real Dimez', 'Real Dimez — official GTA VI screenshot'),
  shot('Real_Dimez_04', 'characters', 'Real Dimez', 'Real Dimez — official GTA VI screenshot'),
  shot('Raul_Bautista_01', 'characters', 'Raul Bautista', 'Raul Bautista, heist veteran — official GTA VI screenshot'),
  shot('Raul_Bautista_02', 'characters', 'Raul Bautista', 'Raul Bautista in GTA VI'),
  shot('Raul_Bautista_03', 'characters', 'Raul Bautista', 'Raul Bautista — official GTA VI screenshot'),
  shot('Raul_Bautista_04', 'characters', 'Raul Bautista', 'Raul Bautista — official GTA VI screenshot'),
  shot('Brian_Heder_01', 'characters', 'Brian Heder', 'Brian Heder, drug runner in the Keys — official GTA VI screenshot'),
  shot('Brian_Heder_02', 'characters', 'Brian Heder', 'Brian Heder at his boat yard — GTA VI'),
  shot('Brian_Heder_03', 'characters', 'Brian Heder', 'Brian Heder — official GTA VI screenshot'),
  shot('Brian_Heder_04', 'characters', 'Brian Heder', 'Brian Heder — official GTA VI screenshot'),
  shot('Cal_Hampton_01', 'characters', 'Cal Hampton', 'Cal Hampton, conspiracy theorist — official GTA VI screenshot'),
  shot('Cal_Hampton_02', 'characters', 'Cal Hampton', 'Cal Hampton at home — GTA VI'),
  shot('Cal_Hampton_04', 'characters', 'Cal Hampton', 'Cal Hampton — official GTA VI screenshot'),

  // ---- Locations ----
  shot('Vice_City_01', 'locations', 'Vice City', 'The Vice City sign at dusk with a plane overhead — GTA VI'),
  shot('Vice_City_02', 'locations', 'Vice City', 'Vice City streets — official GTA VI screenshot'),
  shot('Vice_City_04', 'locations', 'Vice City', 'Vice City nightlife — official GTA VI screenshot'),
  shot('Vice_City_06', 'locations', 'Vice City', 'Vice City beachfront — official GTA VI screenshot'),
  shot('Vice_City_07', 'locations', 'Vice City', 'Vice City skyline — official GTA VI screenshot'),
  shot('Vice_City_08', 'locations', 'Vice City', 'Vice City at golden hour — official GTA VI screenshot'),
  shot('Leonida_Keys_01', 'locations', 'Leonida Keys', 'The Leonida Keys — official GTA VI screenshot'),
  shot('Leonida_Keys_04', 'locations', 'Leonida Keys', 'Boats in the Leonida Keys — GTA VI'),
  shot('Leonida_Keys_05', 'locations', 'Leonida Keys', 'The Leonida Keys coastline — official GTA VI screenshot'),
  shot('Port_Gellhorn_01', 'locations', 'Port Gellhorn', 'Port Gellhorn — official GTA VI screenshot'),
  shot('Port_Gellhorn_02', 'locations', 'Port Gellhorn', 'Port Gellhorn industrial waterfront — GTA VI'),
  shot('Port_Gellhorn_04', 'locations', 'Port Gellhorn', 'Port Gellhorn — official GTA VI screenshot'),
  shot('Port_Gellhorn_05', 'locations', 'Port Gellhorn', 'Port Gellhorn — official GTA VI screenshot'),
  shot('Ambrosia_01', 'locations', 'Ambrosia', 'Ambrosia — official GTA VI screenshot'),
  shot('Ambrosia_02', 'locations', 'Ambrosia', 'Ambrosia township — GTA VI'),
  shot('Ambrosia_03', 'locations', 'Ambrosia', 'Ambrosia — official GTA VI screenshot'),
  shot('Ambrosia_04', 'locations', 'Ambrosia', 'Ambrosia — official GTA VI screenshot'),
  shot('Ambrosia_05', 'locations', 'Ambrosia', 'Ambrosia — official GTA VI screenshot'),
  shot('Mount_Kalaga_National_Park_01', 'locations', 'Mount Kalaga', 'Mount Kalaga National Park — official GTA VI screenshot'),
  shot('Mount_Kalaga_National_Park_02', 'locations', 'Mount Kalaga', 'Mount Kalaga National Park vista — GTA VI'),
  shot('Mount_Kalaga_National_Park_03', 'locations', 'Mount Kalaga', 'Mount Kalaga National Park — official GTA VI screenshot'),
  shot('Mount_Kalaga_National_Park_04', 'locations', 'Mount Kalaga', 'Mount Kalaga National Park — official GTA VI screenshot'),
  shot('Mount_Kalaga_National_Park_06', 'locations', 'Mount Kalaga', 'Mount Kalaga National Park — official GTA VI screenshot'),
  shot('Grassrivers_01', 'locations', 'Grassrivers', 'The Grassrivers wetlands — official GTA VI screenshot'),
  shot('Grassrivers_02', 'locations', 'Grassrivers', 'Grassrivers airboat country — GTA VI'),
  shot('Grassrivers_03', 'locations', 'Grassrivers', 'The Grassrivers — official GTA VI screenshot'),
  shot('Grassrivers_04', 'locations', 'Grassrivers', 'The Grassrivers — official GTA VI screenshot'),
]

export const shotFull = (file: string) => `/screenshots/full/${file}.jpg`
export const shotThumb = (file: string) => `/screenshots/thumb/${file}.jpg`

export const SHOT_FILTERS: { key: 'all' | ShotCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'locations', label: 'Locations' },
  { key: 'characters', label: 'Characters' },
]
