var networkDelayTime = function (times, n, k) {
    // 1. 构建邻接表，节点1~n
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    const INF = Number.MAX_SAFE_INTEGER;
    const dist = new Array(n + 1).fill(INF);
    dist[k] = 0;
    const visited = new Array(n + 1).fill(false);

    // 一共处理n个节点
    for (let i = 0; i < n; i++) {
        // 找到当前距离最小且未访问的节点
        let minDis = INF;
        let cur = -1;
        for (let j = 1; j <= n; j++) {
            if (!visited[j] && dist[j] < minDis) {
                minDis = dist[j];
                cur = j;
            }
        }
        if (cur === -1) break; // 剩余节点不可达，提前退出
        visited[cur] = true;

        // 松弛所有邻边
        for (const [next, weight] of graph[cur]) {
            if (dist[next] > dist[cur] + weight) {
                dist[next] = dist[cur] + weight;
            }
        }
    }

    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === INF) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }
    return maxTime;
};