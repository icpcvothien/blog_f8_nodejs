
class SiteController {
    
    // get home 
    index(req, res){
        res.render('home');
    }
    // get search 
    search(req, res){
        res.send("Trang tim kiem ne chi Trang")
        res.render('search');
    }
}

module.exports = new SiteController();