
    var units = {
        'k' : 10**3,
        'm' : 10**6,
        'b' : 10**9,
        't' : 10**12
    }

    module.exports = (value) => {
        switch(isNaN(value)){
            case true:
                var unit = value.slice(-1).toLowerCase()
                var amount = units[unit]  * parseInt(value.slice(0, -1));
                return parseInt(amount)
            break;

            case false:
                return parseInt(value)
            break;

            default :
                return parseInt(value)
            break;
        }
    }