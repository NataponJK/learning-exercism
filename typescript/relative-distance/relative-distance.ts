interface FamilyTree {
  [parent: string]: string[];
}

interface QueueItem {
  name: string;
  distance: number;
}

interface Graph {
  [person: string]: string[];
}

export function degreesOfSeparation(
  familyTree: FamilyTree,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0;

  const graph: Graph = {};
  
  for (const [parent, children] of Object.entries(familyTree)) {
    graph[parent] ??= [];
    for (const child of children) {
      graph[child] ??= [];
      graph[parent].push(child);
      graph[child].push(parent);
    }
    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        graph[children[i]].push(children[j]);
        graph[children[j]].push(children[i]);
      }
    }
  }
  if (!graph[personA] || !graph[personB]) return -1;
  const visited: Set<string> = new Set([personA]);
  const queue: QueueItem[] = [{ name: personA, distance: 0 }];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break; //Type guard for shift() which can return undefined
    const { name, distance } = current;
    if (name === personB) {
      return distance;
    }
    for (const neighbor of graph[name]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ name: neighbor, distance: distance + 1 });
      }
    }
  }
  return -1;
}
