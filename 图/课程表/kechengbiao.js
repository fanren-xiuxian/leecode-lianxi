
  @param {number} numCourses
  @param {number[][]} prerequisites
  @return {boolean}
 
var canFinish = function(numCourses, prerequisites) {
     1. 初始化邻接表、入度数组
    const graph = Array.from({length numCourses}, () = []);
    const inDegree = new Array(numCourses).fill(0);

     2. 构建图与入度
    for(const [a, b] of prerequisites) {
        graph[b].push(a);  b - a
        inDegree[a]++;
    }

     3. 入度为0的课程入队
    const queue = [];
    for(let i = 0; i  numCourses; i++) {
        if(inDegree[i] === 0) queue.push(i);
    }

    let finished = 0;
     4. BFS遍历
    while(queue.length) {
        const cur = queue.shift();
        finished++;
         遍历当前课程所有后继
        for(const next of graph[cur]) {
            inDegree[next]--;
            if(inDegree[next] === 0) queue.push(next);
        }
    }

     全部课程完成则无环
    return finished === numCourses;
};