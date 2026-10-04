import type { ImageAsset } from './types'

function photo(id: string, fallbackLabel: string, width: number): ImageAsset {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`,
    fallbackLabel,
  }
}

export const images = {
  heroMain: photo('1519741497674-611481863552', 'Foto utama studio', 1600),
  aboutStudio: photo('1552168324-d612d77725e3', 'Suasana studio', 1200),
  portfolio: {
    wedding1: photo('1511285560929-80b456fea0bc', 'Foto pernikahan', 1200),
    wedding2: photo('1465495976277-4387d4b0b4c6', 'Foto pernikahan', 1200),
    wedding3: photo('1583939003579-730e3918a45a', 'Foto pernikahan', 1200),
    graduation1: photo('1627556704302-624286467c65', 'Foto wisuda', 1200),
    graduation2: photo('1523580846011-d3a5bc25702b', 'Foto wisuda', 1200),
    family1: photo('1511895426328-dc8714191300', 'Foto keluarga', 1200),
    family2: photo('1609220136736-443140cffec6', 'Foto keluarga', 1200),
    event1: photo('1540575467063-178a50c2df87', 'Foto acara', 1200),
    event2: photo('1511578314322-379afb476865', 'Foto acara', 1200),
    product1: photo('1523275335684-37898b6baf30', 'Foto produk', 1200),
    product2: photo('1505740420928-5e560c06d30e', 'Foto produk', 1200),
    product3: photo('1542291026-7eec264c27ff', 'Foto produk', 1200),
  },
  avatars: {
    siti: photo('1494790108377-be9c29b29330', 'Foto Siti', 200),
    budi: photo('1500648767791-00dcc994a43e', 'Foto Budi', 200),
    maya: photo('1438761681033-6461ffad8d80', 'Foto Maya', 200),
    rizky: photo('1507003211169-0a1dd7228f2d', 'Foto Rizky', 200),
    dewi: photo('1517841905240-472988babdf9', 'Foto Dewi', 200),
    arif: photo('1534528741775-53994a69daeb', 'Foto Arif', 200),
  },
} satisfies Record<string, ImageAsset | Record<string, ImageAsset>>
