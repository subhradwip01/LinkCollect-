
// o(n) time complexity
export const filterDuplicateTimelines = (ExistingTimelines, newTimelines) => {
    const lookUp = {};
    ExistingTimelines.forEach((timeline) => {
      const link = timeline.link;
      lookUp[link] = (lookUp[link] || 0) + 1;
    });
  
    return newTimelines.filter((timeline) => {
      const link = timeline.link;
      if (!lookUp[link]) {
        lookUp[link] = (lookUp[link] || 0) + 1;
        return timeline;
      }
    });
  };
  

//   export const filterDuplicateTimelines = (existingTimelines, newTimelines) => {
//     const existingLinks = new Set(existingTimelines.map((timeline) => timeline.link));
  
//     return newTimelines.filter((timeline) => {
//       if (!existingLinks.has(timeline.link)) {
//         existingLinks.add(timeline.link);
//         return true;
//       }
//       return false;
//     });
//   };
  