const TimelineRepo = require('../repository/timelineRepo');

class TimelineService {
     constructor(){
        this.timelineRepo = new TimelineRepo();
     }
     create = async(data)=>{
        try {
            const timeline = await this.timelineRepo.create(data);
            return timeline;            
        } catch (error) {
            throw error;
        }
     }
     delete = async(id)=>{
          try {
            const timeline = await this.timelineRepo.delete(id);
            return timeline;
          } catch (error) {
             throw error;
          }
     }
     update = async(id,data)=>{
        try {

            const timeline = await this.timelineRepo.update(id,data);
            return timeline;
            
        } catch (error) {
            throw error;
        }
     }
     get = async(id) => {
        try {
            const timeline = await this.timelineRepo.get(id);
            return timeline;
        } catch (error) {
            throw error;
        }
     }     // this will get particular timeline id
     getAll = async(id) => {
         try {
            const timeline = await this.timelineRepo.getAll(id);
            return timeline;
         } catch (error) {
            throw error;
         }
     }  // this will get collection id
}

module.exports = TimelineService