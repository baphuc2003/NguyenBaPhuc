// Use loops
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Use recursive
function sum_to_n_b(n: number): number {
  if (n == 1) {
    return 1;
  }
  return sum_to_n_b(n - 1) + n;
}

//Use linked list
class Node {
  value: number;
  next: Node | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  static createLinkedList(n: number) {
    let headNode = null;
    for (let i = n; i >= 1; i--) {
      const node = new Node(i);
      node.next = headNode;
      headNode = node;
    }
    return headNode;
  }

  static printLinkedList(headNode: Node | null) {
    let list = "";
    let currentNode = headNode;
    while (currentNode != null) {
      list += currentNode.value;
      if (currentNode.next != null) {
        list += "->";
      }
      currentNode = currentNode.next;
    }
    return list;
  }

  static sum_to_n_c(n: number) {
    let node = this.createLinkedList(n);
    let sum = 0;
    while (node != null) {
      sum += node.value;
      node = node.next;
    }
    return sum;
  }
}
const node = Node.createLinkedList(3);
// console.log(Node.printLinkedList(node));

//Use formula for calculating the sum of terms
function sum_to_n_d(n: number): number {
  return (n * (n + 1)) / 2;
}

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(Node.sum_to_n_c(5));
console.log(sum_to_n_d(5));
