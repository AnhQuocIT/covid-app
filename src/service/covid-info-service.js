import Axios from "axios"
import LocalStorage from "../service/localstorage-service"
export default ( function () {
    const inforMgr = {
        url: "https://api.covid19api.com/summary",
        getInfo() {
            return new Promise((resolve, reject) =>{
                Axios.get(this.url).then(res => {
                    res.data = this.mapDataWithStorage(res.data);
                    resolve(res);
                }).catch(res => {
                    reject(res);
                });
            });
        },
        mapDataWithStorage(data) {
            let dataStorage = LocalStorage.getDataFromStorage();
            dataStorage.forEach(item => {
                data.Countries.find(country => {
                    if (country.CountryCode == item) {
                        country.isFavorite = true;
                        return;
                    }
                })
            })
            return data;
        }
        
    }
    return inforMgr;
})();