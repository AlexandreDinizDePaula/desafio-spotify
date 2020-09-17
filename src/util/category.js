module.exports = function(temp) {
    if(temp > 30){
        return 'party'
    }
    if( temp >= 15 && temp <= 30){
        return 'pop'
    }
    if( temp >= 10 && temp <= 14){
        return 'rock'
    }
    else{
        return 'classical'
    }
    
}
