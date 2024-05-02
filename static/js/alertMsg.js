import { alert } from './hmtlComponent.js'
let Alert = {}

Alert.Success = function (msg , timeout){
    let obj = alert.Success(msg)
    let t = timeout == null || timeout <= 0 ? 5000 : timeout; 
    $('#Alert-Screen').append(obj['html']);
    setTimeout(()=>{
        $('#Alert-Screen').find('#'+ obj['uuid']).remove();
    }, t);
}
Alert.Danger = function (msg , timeout ){
    console.warn('Alert.Danger: ', msg, timeout);
    let obj = alert.Danger(msg)
    let t = timeout == null || timeout <= 0 ? 5000 : timeout; 
    $('#Alert-Screen').append(obj['html']);
    setTimeout(()=>{
        $('#Alert-Screen').find('#'+ obj['uuid']).remove();
    }, t);
}
Alert.Warning = function (msg , timeout ){
    console.warn('Alert.Warning', msg, timeout);
    let obj = alert.Warning(msg)
    let t = timeout == null || timeout <= 0 ? 5000 : timeout; 
    $('#Alert-Screen').append(obj['html']);
    setTimeout(()=>{
        $('#Alert-Screen').find('#'+ obj['uuid']).remove();
    }, t);
}

$("#Alert-Screen").on("click", ".alert-exit", function(){
    $(this).parent().remove();
});

export {Alert}