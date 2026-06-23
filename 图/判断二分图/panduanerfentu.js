/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
    const n = graph.length;
    // -1：未染色，0、1两种颜色
    const color = new Array(n).fill(-1);

    // 遍历所有节点，处理多个连通分量
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            const queue = [i];
            color[i] = 0; // 起点先染0

            while (queue.length) {
                const cur = queue.shift();
                // 遍历当前节点所有邻居
                for (const neighbor of graph[cur]) {
                    if (color[neighbor] === -1) {
                        // 邻居未染色，染相反色
                        color[neighbor] = color[cur] ^ 1;
                        queue.push(neighbor);
                    } else if (color[neighbor] === color[cur]) {
                        // 邻居已染色且同色，存在奇数环，不是二分图
                        return false;
                    }
                }
            }
        }
    }
    return true;
};