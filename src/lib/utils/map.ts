import type { Point, MapPath, Landmark, MapDie } from '../types/map';

export function drawPath(ctx: CanvasRenderingContext2D, path: MapPath) {
  if (path.points.length < 2) return;
  
  ctx.beginPath();
  ctx.strokeStyle = path.color;
  ctx.lineWidth = path.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.moveTo(path.points[0].x, path.points[0].y);
  for (let i = 1; i < path.points.length; i++) {
    ctx.lineTo(path.points[i].x, path.points[i].y);
  }
  ctx.stroke();
}

export function drawLandmark(ctx: CanvasRenderingContext2D, landmark: Landmark) {
  const size = 24;
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${size}px "Lucide Icons"`;
  ctx.fillText(getLandmarkIcon(landmark.type), landmark.position.x, landmark.position.y);
}

export function drawCurrentLocation(ctx: CanvasRenderingContext2D, point: Point) {
  const size = 16;
  ctx.fillStyle = '#ef4444'; // red-500
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

export function getLandmarkIcon(type: string): string {
  // Map landmark types to their corresponding Unicode characters from Lucide Icons
  const icons: Record<string, string> = {
    town: '🏠',      // house
    city: '⛪',      // building
    capital: '🏤',   // building-2
    ruins: '🏰',     // castle
    landmark: '🏛',  // landmark
    mountain: '🗻',  // mountain
    forest: '🌳',    // trees
  };
  return icons[type] || '';
  // 🏫🏢🏦🏨🏭🏛🏗
  // ❔❓📌
  // 🌳🌲🌴
  // ⛰🏔🗻
}

export function findLandmarkAtPoint(point: Point, landmarks: Landmark[]): number {
  const clickRadius = 12; // Half of landmark size
  return landmarks.findIndex(landmark => {
    const dx = landmark.position.x - point.x;
    const dy = landmark.position.y - point.y;
    return Math.sqrt(dx * dx + dy * dy) <= clickRadius;
  });
}

export function findDieAtPoint(point: Point, dice: MapDie[]): number {
  const clickRadius = 15; // Half of die size
  return dice.findIndex(die => {
    const dx = die.position.x - point.x;
    const dy = die.position.y - point.y;
    return Math.sqrt(dx * dx + dy * dy) <= clickRadius;
  });
}

export function drawDie(ctx: CanvasRenderingContext2D, die: MapDie) {
  const size = 30;
  const x = die.position.x - size / 2;
  const y = die.position.y - size / 2;
  
  let color;
  switch (die.type) {
    case 'biome':
      color = '#22c55e';
      break;
    case 'landmark':
      color = '#3b82f6';
      break;
    case 'bonus':
      color = '#a855f7';
      break;
  }
  
  ctx.fillStyle = color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, 8);
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(die.value.toString(), die.position.x, die.position.y);
}

export function getRandomPoint(canvas: HTMLCanvasElement): Point {
  const padding = 50;
  return {
    x: padding + Math.random() * (canvas.width - padding * 2),
    y: padding + Math.random() * (canvas.height - padding * 2)
  };
}

export function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}