export class MinHeap<T> {
  private heap: { priority: number; item: T }[] = [];

  insert(item: T, priority: number) {
    this.heap.push({ item, priority });
    this.bubbleUp();
  }

  extractMin(): T | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0].item;
    const end = this.heap.pop();
    if (this.heap.length > 0 && end) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];
      if (element.priority >= parent.priority) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  private sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      let swap = null;
      if (leftIdx < length && this.heap[leftIdx].priority < element.priority) {
        swap = leftIdx;
      }
      if (
        rightIdx < length &&
        this.heap[rightIdx].priority < (swap === null ? element.priority : this.heap[leftIdx].priority)
      ) {
        swap = rightIdx;
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = element;
      idx = swap;
    }
  }
}
