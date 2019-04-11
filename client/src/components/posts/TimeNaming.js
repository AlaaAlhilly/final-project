import moment from 'moment'

export default class TimeNaming{
    getDateNames=(date_posted)=>{
   
        let now = moment(new Date())
        let d = moment(date_posted)
        if(now.diff(d,'minutes') <1){
            return "Just Now"
        }else if(now.diff(d,'minutes')===1){
            return "1 Minute ago "
        }else if(now.diff(d,'hours')<1){
            return now.diff(d,'minutes')+" Minutes ago"
        }else if(now.diff(d,'hours') === 1){
            return "1 Hour ago"
        }else if(now.diff(d,'days')<1){
            return now.diff(d,'hours')+" Hours ago"
        }else if(now.diff(d,'days')<2){
            return "Yesterday "+" at "+moment(date_posted).format('hh:mm a')
        }else if(now.diff(d,'weeks')<1){
            return now.diff(d,'days')+" Days ago at "+moment(date_posted).format('hh:mm a')
        }else if(now.diff(d,'weeks')===1){
            return "1 week ago"
        }else if(now.diff(d,'weeks') <4){
            return now.diff(d,'weeks')+" weeks ago on "+moment(date_posted).format('dddd')+" at "+moment(date_posted).format('hh:mm a')
        }else if(now.diff(d,'weeks') ===4){
            return "1 Month ago on "+moment(date_posted).format('dddd')+" at "+moment(date_posted).format('hh:mm a')
        }else if(now.diff(d,'weeks')/4 <12){
            return parseInt(now.diff(d,'weeks')/4)+" Months ago "+moment(date_posted).format('MMM DDDD')+" on "+moment(date_posted).format('dddd')+" at "+moment(date_posted).format('hh:mm a')
        }else if(now.diff(d,'weeks')/4 === 12){
            return "1 Year ago "+moment(date_posted).format('MMM d yy')+" on "+moment(date_posted).format('dddd')+" at "+moment(date_posted).format('hh:mm a')
        }else {
            return parseInt(now.diff(d,'weeks')/4)/12 + "Years ago "+moment(date_posted).format('MMM d yy')+" on "+moment(date_posted).format('dddd')+" at "+moment(date_posted).format('hh:mm a')
        }
        
      }
}