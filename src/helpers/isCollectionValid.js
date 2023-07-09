

// const { Collection } = require("../models");

// async function isValidCollec() {
//     const collectionId = req.params.id;
//     let collection;
//     try {
//         collection = await Collection.findById(collectionId);
//     } catch(err) {
//         console.log("err: in middleware ",err )
        
//     }
//     // if (req.userId != collection.userId && !collection.isPublic) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "The Collection you're trying to access is private!!!",
//     //     err: "unauthorized to perform this action",
//     //     data: {},
//     //   });
//     // }
//     if (collection.id == null || !collection) {
//       return res.status(400).json({
//         success: false,
//         message: "The Collection you're trying to access is private!!!",
//         err: "unauthorized to perform this action",
//         data: {},
//       });
//     }
// }
// module.exports = {
//    isValidCollec
//   };