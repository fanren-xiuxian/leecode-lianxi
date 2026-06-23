var findOrder = function(numCourses, prerequisites) {
    const graph = Array.from({length: numCourses}, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for(let [a, b] of prerequisites){
        graph[b].push(a);
        inDegree[a]++;
    }
    const queue = [];
    for(let i = 0; i < numCourses; i++){
        if(inDegree[i] === 0) queue.push(i);
    }
    const res = [];
    while(queue.length){
        const cur = queue.shift();
        res.push(cur);
        for(let nxt of graph[cur]){
            inDegree[nxt]--;
            if(inDegree[nxt] === 0) queue.push(nxt);
        }
    }
    return res.length === numCourses ? res : [];
};