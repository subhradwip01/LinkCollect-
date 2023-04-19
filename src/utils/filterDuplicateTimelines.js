// This approach has a time complexity of o(n) beacause we are using a lookUp object
exports.filterDuplicateTimelines = (ExistingTimelines, newTimelines) => {
    const lookUp = {}
    ExistingTimelines.forEach(timeline=>{
        const link = timeline.link
        lookUp[link] = (lookUp[link] || 0 ) + 1;
    })
    
    return newTimelines.filter(timeline=>{
        const link = timeline.link
        if(!lookUp[link]){
            lookUp[link] = (lookUp[link] || 0 ) + 1;
            return timeline
        }
    })
}

// lookUp[link] = (lookUp[link] || 0 ) + 1;
// if(lookUp[link] === 1){
//     return timeline
// }