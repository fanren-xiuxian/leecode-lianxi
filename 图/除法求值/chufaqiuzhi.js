/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
    // 1. 构建带权双向图邻接表
    const graph = new Map();
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        const val = values[i];
        // a -> b 权重 val
        if (!graph.has(a)) graph.set(a, []);
        graph.get(a).push([b, val]);
        // b -> a 权重 1/val
        if (!graph.has(b)) graph.set(b, []);
        graph.get(b).push([a, 1 / val]);
    }

    // DFS：从start走到end，返回乘积，无路径返回-1
    const dfs = (start, end, visited) => {
        // 变量不存在图中
        if (!graph.has(start) || !graph.has(end)) return -1.0;
        // 起点等于终点，x/x=1
        if (start === end) return 1.0;
        visited.add(start);
        // 遍历所有邻居
        for (const [neighbor, weight] of graph.get(start)) {
            if (!visited.has(neighbor)) {
                const res = dfs(neighbor, end, visited);
                if (res !== -1) {
                    return weight * res;
                }
            }
        }
        // 无通路
        return -1.0;
    };

    // 处理所有查询
    const ans = [];
    for (const [c, d] of queries) {
        ans.push(dfs(c, d, new Set()));
    }
    return ans;
};

// 测试示例1
const eq = [["a","b"],["b","c"]];
const val = [2.0,3.0];
const q = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]];
console.log(calcEquation(eq, val, q));
// [6, 0.5, -1, 1, -1]