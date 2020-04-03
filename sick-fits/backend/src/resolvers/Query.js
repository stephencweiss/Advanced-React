const Query = {
    dogs: function(parent, args, ctx, info){
        return [{name: 'Snickers', breed: 'GSP'}, {name: 'Finn', breed: 'Lab/Pitt mix'}]
    }
};

module.exports = Query;
