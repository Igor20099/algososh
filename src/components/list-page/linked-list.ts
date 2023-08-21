export class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  append(data: T): void {
    const newNode = new Node(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  prepend(data: T): void {
    const newNode = new Node(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.head) {
        newNode.next = this.head;
        this.head = newNode;
      }
    }
    this.length++;
  }

  toArray(): T[] {
    const output: T[] = [];
    let currentNode = this.head;

    while (currentNode) {
      output.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return output;
  }

  addByIndex(data: T, index: number): void {
    if (index < 0) {
      throw new Error("Index out of range");
    }

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let prev = null;
    let currentIndex = 0;

    while (current !== null && currentIndex < index) {
      prev = current;
      current = current.next;
      currentIndex++;
    }

    if (currentIndex === index) {
      newNode.next = current;
      prev!.next = newNode;
    } else {
      throw new Error("Index out of range");
    }
  }
  getHead = () => this.head;
  getTail = () => this.tail;

  deleteHead(): void {
    if (this.head !== null) {
      this.head = this.head.next;
    }
    this.length--;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode!.next) {
      if (!currentNode!.next.next) {
        currentNode!.next = null;
      } else {
        currentNode = currentNode!.next;
      }
    }

    this.tail = currentNode;
    this.length--;
    return deletedTail;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let curr = this.head;
    while (counter !== index && curr) {
      curr = curr?.next;
      counter++;
    }
    return curr;
  }

  deleteByIndex(index: number) {
    if (index === 0) return this.deleteHead();
    if (index === this.length - 1) return this.deleteTail();
    let prev = this.get(index - 1);
    if (prev?.next) {
      let deletedNode = prev?.next;
      prev.next = deletedNode?.next;
      this.length--;
      return deletedNode;
    }
  }
}
