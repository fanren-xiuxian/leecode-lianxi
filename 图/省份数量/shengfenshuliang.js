/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let count = 0;

    // DFS：标记和city连通的所有城市
    const dfs = (city) => {
        visited[city] = true;
        // 遍历所有城市，找连通点
        for (let j = 0; j < n; j++) {
            if (isConnected[city][j] === 1 && !visited[j]) {
                dfs(j);
            }
        }
    };

    // 遍历每一座城市
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            dfs(i);
        }
    }
    return count;
};

// 测试用例
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 输出2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // 输出3