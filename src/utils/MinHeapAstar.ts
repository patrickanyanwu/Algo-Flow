type HeapItem<T> = {
  item: T;
  priority: number;
};

export class MinHeapAstar<T extends { distance: number }> {
  private heap: HeapItem<T>[] = [];

  insert(item: T, priority: number): void {
    this.heap.push({ item, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin(): T | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0].item;
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    const element = this.heap[index];
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];

      if (
        element.priority < parent.priority ||
        (element.priority === parent.priority &&
          element.item.distance < parent.item.distance)
      ) {
        this.heap[parentIdx] = element;
        this.heap[index] = parent;
        index = parentIdx;
      } else {
        break;
      }
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;

    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let smallest = index;

      if (
        leftIdx < length &&
        (this.heap[leftIdx].priority < this.heap[smallest].priority ||
          (this.heap[leftIdx].priority === this.heap[smallest].priority &&
            this.heap[leftIdx].item.distance < this.heap[smallest].item.distance))
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx < length &&
        (this.heap[rightIdx].priority < this.heap[smallest].priority ||
          (this.heap[rightIdx].priority === this.heap[smallest].priority &&
            this.heap[rightIdx].item.distance < this.heap[smallest].item.distance))
      ) {
        smallest = rightIdx;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}
