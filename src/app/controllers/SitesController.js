
class SitesController{
    
    // [GET] /index
    home(req,res){
        res.render('sites/index')
    }
    
}

module.exports = new SitesController