const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data, this._tail);
        if (this.length++ > 0) {
            this._tail = this._tail.next = node;
        } else {
            this._head = this._tail = node;
        }
        return this;
    }

    head() {
        return this._head && this._head.data;
    }

    tail() {
        return this._tail && this._tail.data;
    }

    at(index) {
        let curr = this._nodeAt(index);
        return curr ? curr.data : void 0;
    }

    insertAt(index, data) {
        if (this.length === 0) {
            return this.append(data);
        }
        let curr = this._nodeAt(index);
        if (curr) {
            const node = new Node(data, curr.prev, curr);
            if (curr.prev) {
                curr.prev.next = node;
            }
            curr.prev = node;
            this._checkHeadTail(curr, node, node);
            ++this.length;
        }
        return this;
    }

    isEmpty() {
        return !this._head;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let curr = this._nodeAt(index);
        if (curr) {
            if (curr.prev) {
                curr.prev.next = curr.next;
            }
            if (curr.next) {
                curr.next.prev = curr.prev;
            }
            this._checkHeadTail(curr, curr.next, curr.prev);
            --this.length;
        }
        return this;
    }

    reverse() {
        let curr = this._head;
        while (curr) {
            let temp = curr.prev;
            curr.prev = curr.next;
            curr.next = temp;
            curr = curr.prev;
        }
        let temp = this._head;
        this._head = this._tail;
        this._tail = temp;
        return this;
    }

    indexOf(data) {
        let curr = this._head,
            i = 0;
        while (i < this.length) {
            if (curr.data === data) {
                return i;
            }
            curr = curr.next;
            ++i;
        }
        return -1;
    }

    _nodeAt(index) {
        let curr = this._head;
        while (index-- && curr.next) {
            curr = curr.next;
        }
        return curr;
    }

    _checkHeadTail(curr, head, tail) {
        if (this._head === curr) {
            this._head = head;
        }
        if (this._tail === curr) {
            this._tail = tail;
        }
    }
}

module.exports = LinkedList;
