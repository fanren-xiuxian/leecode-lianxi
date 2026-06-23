/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    // 哈希表：key=原图节点，value=克隆后的新节点
    const map = new Map();

    const dfs = (curNode) => {
        // 边界1：空节点直接返回
        if (!curNode) return null;
        // 边界2：该节点已经克隆过，直接返回缓存的新节点，避免环死循环
        if (map.has(curNode)) return map.get(curNode);

        // 1. 创建当前节点的克隆
        const cloneNode = new _Node(curNode.val);
        // 存入哈希表缓存
        map.set(curNode, cloneNode);

        // 2. 遍历原节点所有邻居，递归克隆邻居并挂载到新节点
        for (const neighbor of curNode.neighbors) {
            cloneNode.neighbors.push(dfs(neighbor));
        }

        return cloneNode;
    };

    return dfs(node);
};