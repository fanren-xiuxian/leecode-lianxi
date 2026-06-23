/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const n = edges.length;
    // parent数组：下标对应节点，值为父节点，节点范围1~n
    const parent = new Array(n + 1);
    // 初始化：每个节点父节点初始为自己
    for (let i = 0; i <= n; i++) {
        parent[i] = i;
    }

    // 查找根节点 + 路径压缩
    const find = (x) => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };

    // 合并两个集合
    const union = (x, y) => {
        const rootX = find(x);
        const rootY = find(y);
        parent[rootX] = rootY;
    };

    // 遍历所有边
    for (const [u, v] of edges) {
        const rootU = find(u);
        const rootV = find(v);
        if (rootU === rootV) {
            // 两点已连通，当前边是冗余边
            return [u, v];
        }
        union(u, v);
    }

    return [];
};