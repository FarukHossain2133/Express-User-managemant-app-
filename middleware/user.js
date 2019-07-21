module.exports = function(options){
return function(req, res, next){
    console.log("External middleware")
    next()
}
}