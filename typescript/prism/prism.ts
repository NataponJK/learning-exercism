interface StartConfig {
  x: number;
  y: number;
  angle: number;
}

interface Prism {
  id: string | number;
  x: number;
  y: number;
  angle: number;
}

export function findSequence(start: StartConfig, prisms: Prism[]): (string | number)[] {
  let { x, y, angle } = start;
  const sequence: (string | number)[] = [];
  
  while (true) {
    const rad: number = (angle * Math.PI) / 180;
    const dirX: number = Math.cos(rad);
    const dirY: number = Math.sin(rad);
    let nearest: Prism | null = null;
    let nearestDist: number = Infinity;
    
    for (const prism of prisms) {
      const dx: number = prism.x - x;
      const dy: number = prism.y - y;
      const dist: number = dx * dirX + dy * dirY;
      const baseTolerance: number = 1e-6;
      if (dist <= baseTolerance) continue;
      const crossProductSquared: number = (dx - dist * dirX) ** 2 + (dy - dist * dirY) ** 2;
      const relativeTolerance: number = baseTolerance * Math.max(1, dist * dist);
      if (crossProductSquared >= relativeTolerance) continue;
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = prism;
      }
    }
    if (!nearest) break;
    sequence.push(nearest.id);
    x = nearest.x;
    y = nearest.y;
    angle = (angle + nearest.angle) % 360;
  }
  return sequence;
}
