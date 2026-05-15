import { BUILDINGS } from '@/constants/buildings';
import { Building } from './Building';

export function Buildings() {
  return (
    <>
      {BUILDINGS.map((b) => (
        <Building key={b.id} def={b} />
      ))}
    </>
  );
}
